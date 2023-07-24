import useScreenResolution, {
  SCREEN_MIN_XS,
} from '@/hooks/use-screen-resolution';
import { GraphQLGame } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { styled } from 'goober';
import React from 'react';
import Header from './header';

type IconButtonProps = { className: string; children: React.ReactNode };

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`${className} h-10 w-10 cursor-pointer rounded-full border-none bg-transparent p-2 transition hover:bg-slate-100/[0.2]`}
      >
        {children}
      </button>
    );
  },
);
IconButton.displayName = 'Icon Button';

type WrapperProps = {
  $color: string;
  children: React.ReactNode;
};

const DetailsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Art = styled('img')`
  height: 210px;

  @media screen and (max-width: ${SCREEN_MIN_XS}px) {
    height: 100px;
    border-radius: 0.3rem;
  }
`;

const StyledIconButton = styled('div')`
  && {
    position: absolute;
    bottom: 0;
    left: 0;
    touch-action: none;

    @media screen and (max-width: ${SCREEN_MIN_XS}px) {
      width: 25px;
      height: 25px;
      top: 0;

      svg {
        width: 16px;
        height: 16px;
      }

      &.MuiTouchRipple-root {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

type Props = {
  game: GraphQLGame;
  index?: number;
  onClick: (game: GraphQLGame) => void;
  style?: Record<string, string | number | undefined>;
};

const GameEntry = React.forwardRef<HTMLDivElement, Props>(
  ({ game, index, onClick, style, ...props }: Props, ref) => {
    const { name, platform, region, art, variant, color } = game;
    const { isMobileResolution } = useScreenResolution();

    return (
      <div ref={ref} style={style}>
        <button
          className="cursor-pointer border-none bg-transparent p-0"
          onClick={() => onClick(game)}
        >
          <div
            className="relative m-4 flex min-h-[310px] w-fit min-w-[250px] flex-col space-y-3 rounded-2xl p-3 text-white sm:m-2 sm:min-h-0 sm:min-w-[90px] sm:p-1"
            style={{ backgroundColor: color }}
          >
            {!isMobileResolution && (
              <Header name={name} platform={platform} region={region} />
            )}
            <DetailsWrapper>
              <Art src={art} />
              {variant && !isMobileResolution && (
                <span className="mt-2 flex w-full justify-end text-xs">
                  {variant}
                </span>
              )}
            </DetailsWrapper>
            <IconButton
              {...props}
              className="absolute bottom-0 left-0 m-0 text-white"
            >
              <DragIndicatorIcon />
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
