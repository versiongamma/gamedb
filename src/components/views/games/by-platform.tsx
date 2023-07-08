import { GraphQLGame } from "@/types";
import { PLATFORMS_BY_YEAR } from "@/utils/types";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, Collapse, Divider } from "@mui/material";
import { styled } from "goober";
import { useState } from "react";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import useGames from "@/hooks/use-games";
import { getGamesByPlatform } from "@/utils/sort";
import GameEntry, { SortableGameEntry } from "../../entry/game-entry";
import useUpdateGameOrderMutation from "./use-update-game-order";

const StyledDivider = styled(Divider)`
  &.MuiDivider-root::before {
    width: 1%;
  }
`;

const StyledChip = styled(Chip)``;

type PlatformDisplayProps = {
  platform: string;
  games: GraphQLGame[];
  handleGameClick: (game: GraphQLGame) => void;
};

const PlatformDisplay = ({
  platform,
  games,
  handleGameClick,
}: PlatformDisplayProps) => {
  const [activeGame, setActiveGame] = useState<GraphQLGame | null>(null);
  const [sortedGames, setSortedGames] = useState(
    games.sort((a, b) => (a.indexInPlatform ?? 0) - (b.indexInPlatform ?? 0))
  );
  const [open, setOpen] = useState(true);
  const [updateGameOrder] = useUpdateGameOrderMutation();

  const moveTo = async (fromIndex: number, toIndex: number) => {
    updateGameOrder(
      sortedGames.map(({ id }) => id),
      fromIndex,
      toIndex
    );
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSortedGames((games) => {
        const oldIndex = games.findIndex(({ id }) => id === active.id);
        const newIndex = games.findIndex(({ id }) => id === over.id);

        return arrayMove(games, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <br />
      <StyledDivider textAlign="left">
        <StyledChip
          label={platform}
          deleteIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onDelete={() => setOpen(!open)}
          onClick={() => setOpen(!open)}
        />
      </StyledDivider>
      <Collapse in={open}>
        <DndContext
          sensors={sensors}
          onDragOver={handleDragOver}
          collisionDetection={pointerWithin}
        >
          <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
            <SortableContext items={sortedGames} strategy={() => null}>
              {sortedGames.map((game) => (
                <SortableGameEntry
                  key={game.id}
                  game={game}
                  index={game.indexInPlatform ?? 0}
                  onClick={handleGameClick}
                  moveTo={moveTo}
                />
              ))}
              <DragOverlay>
                {activeGame ? (
                  <GameEntry game={activeGame} onClick={handleGameClick} />
                ) : null}
              </DragOverlay>
            </SortableContext>
          </div>
        </DndContext>
      </Collapse>
    </>
  );
};

type Props = {
  handleGameClick: (game: GraphQLGame) => void;
};

const ByPlatform = ({ handleGameClick }: Props) => {
  const { games: cache } = useGames();
  const games = [...(cache ?? [])];

  if (!games) {
    return null;
  }

  const gamesByPlatform = getGamesByPlatform(games);
  const shownPlatforms = Object.keys(gamesByPlatform);
  const platforms = PLATFORMS_BY_YEAR.filter((platform) =>
    shownPlatforms.includes(platform)
  );

  return (
    <>
      {platforms.map((platform) => (
        <PlatformDisplay
          key={platform}
          platform={platform}
          games={gamesByPlatform[platform]}
          handleGameClick={handleGameClick}
        />
      ))}
    </>
  );
};

export default ByPlatform;
