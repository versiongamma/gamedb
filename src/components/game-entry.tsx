import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import React from 'react';

import useScreenResolution from '@/hooks/use-screen-resolution';
import { GraphQLGame, Platform, Region } from '@/types';
import { REGION_LABEL_MAP } from '@/utils/types';
import IconButton from './input/icon-button';

type Props = {
  game: GraphQLGame;
  index?: number;
  onClick: (game: GraphQLGame) => void;
  style?: Record<string, string | number | undefined>;
};

const GameEntry = React.forwardRef<HTMLDivElement, Props>(
  ({ game, index, onClick, style, ...props }: Props, ref) => {
    const { name, region, art, variant, color } = game;
    const { isMobileResolution } = useScreenResolution();

    return (
      <div ref={ref} style={style}>
        <button
          className="cursor-pointer border-none bg-transparent p-0"
          onClick={() => onClick(game)}
        >
          <div
            className={`relative m-4 flex ${
              art ? 'h-[310px]' : 'h-[100px]'
            } w-fit min-w-[250px] flex-col items-center space-y-4 rounded-2xl p-3 text-white xs:m-2 xs:h-auto xs:w-[170px] xs:min-w-0 xs:p-1.5`}
            style={{ backgroundColor: color }}
          >
            {/* Header */}
            <div className="flex w-fit flex-col items-center px-2 py-0">
              <span className="text-l font-medium xs:text-s xs:font-normal">
                {name}
              </span>
              <div className="flex w-full flex-row items-center justify-end xs:hidden">
                {region && (
                  <span className="text-xs">({REGION_LABEL_MAP[region]})</span>
                )}
              </div>
            </div>

            {art && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="h-[210px] rounded-md xs:h-auto xs:w-[100px]"
                src={art}
                alt="art"
              />
            )}
            {variant && !isMobileResolution && (
              <span className="flex w-full justify-end text-xs">{variant}</span>
            )}

            <IconButton
              {...props}
              className="absolute bottom-0 left-0 m-0 text-white xs:bottom-1 xs:left-1 xs:h-5 xs:w-5"
            >
              <DragIndicatorIcon className="xs:h-4 xs:w-4" />
            </IconButton>
          </div>
        </button>
      </div>
    );
  },
);
GameEntry.displayName = 'GameEntry';

export const SortableGameEntry = (props: Props) => {
  const { game } = props;
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: game.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    transition,
  };

  return (
    <GameEntry
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    />
  );
};

export default GameEntry;
