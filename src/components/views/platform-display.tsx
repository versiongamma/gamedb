import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, Collapse, Divider } from '@mui/material';
import { useEffect, useState } from 'react';

import useUpdateGameOrderMutation from '@/hooks/games/use-update-game-order';
import { GraphQLGame } from '@/types';
import GameEntry, { SortableGameEntry } from '../game-entry';
import { List } from '@/routes';

type Props = {
  platform: string;
  games: GraphQLGame[];
  handleGameClick: (game: GraphQLGame) => void;
  list: List;
};

const PlatformDisplay = ({ platform, games, handleGameClick, list }: Props) => {
  const [activeGame, setActiveGame] = useState<GraphQLGame | null>(null);
  const [sortedGames, setSortedGames] = useState<GraphQLGame[]>([]);

  useEffect(() => {
    setSortedGames(
      games.sort((a, b) => (a.indexInPlatform ?? 0) - (b.indexInPlatform ?? 0)),
    );
  }, [games]);

  const [open, setOpen] = useState(true);
  const [updateGameOrder] = useUpdateGameOrderMutation(list);

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
    const order = sortedGames.map(({ id }, index) => ({
      id,
      indexInPlatform: index,
    }));
    updateGameOrder({ order, list });
    handleDragCancel();
  };

  // if (platform === 'SNES') {
  //   console.log(games);
  // }

  return (
    <>
      <br />
      <Divider textAlign={'left'} className="before:hidden">
        <Chip
          className="group m-3 rounded-full bg-transparent font-semibold transition hover:bg-secondary hover:text-primary"
          label={platform}
          deleteIcon={
            open ? (
              <ExpandLessIcon className="!text-white transition group-hover:!text-primary" />
            ) : (
              <ExpandMoreIcon className="!text-white transition group-hover:!text-primary" />
            )
          }
          onDelete={() => setOpen(!open)}
          onClick={() => setOpen(!open)}
        />
      </Divider>
      <Collapse in={open}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          collisionDetection={pointerWithin}
        >
          <div className="flex w-full flex-wrap items-center">
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

export default PlatformDisplay;
