import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, Collapse, Divider } from "@mui/material";
import { styled } from "goober";
import { useState } from "react";

import useGames from "@/hooks/use-games";
import { GraphQLGame } from "@/types";
import { getGamesByPlatform } from "@/utils/sort";
import { PLATFORMS_BY_YEAR } from "@/utils/types";
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

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveGame(games.find(({ id }) => id === active.id) ?? null);
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

  const handleDragCancel = () => {
    setActiveGame(null);
  };

  const handleDragEnd = () => {
    const order = sortedGames.map(({ id }, index) => ({ id, index }));
    updateGameOrder({ order });
    handleDragCancel();
  };

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
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          collisionDetection={pointerWithin}
        >
          <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
            <SortableContext items={sortedGames} strategy={() => null}>
              {sortedGames.map((game) => (
                <SortableGameEntry
                  key={game.id}
                  game={game}
                  onClick={handleGameClick}
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

const Collection = ({ handleGameClick }: Props) => {
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

export default Collection;
