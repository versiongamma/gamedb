import useScreenResolution, {
  SCREEN_MIN_MD,
  SCREEN_MIN_XS,
} from "@/hooks/use-screen-resolution";
import { GraphQLGame } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { styled } from "goober";
import React from "react";
import Header from "./header";
import Variant from "./variant";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { IconButton } from "@mui/material";

const Button = styled("div", React.forwardRef)`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

type WrapperProps = {
  $color: string;
  children: React.ReactNode;
};

const Wrapper = styled<WrapperProps>("div")`
  width: fit-content;
  color: white;
  min-width: 250px;
  min-height: 310px;
  background-color: ${({ $color }) => $color ?? "#eeeeee"};
  border-radius: 1rem;
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 1rem;

  @media screen and (max-width: ${SCREEN_MIN_XS}px) {
    margin: 0.6rem;
    padding: 0.4rem;
    min-width: 90px;
    min-height: 0;
  }

  > * {
    margin: 0.6rem 0.8rem;
  }
`;

const DetailsWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Art = styled("img")`
  height: 210px;

  @media screen and (max-width: ${SCREEN_MIN_XS}px) {
    height: 100px;
    border-radius: 0.3rem;
  }
`;

const StyledIconButton = styled(IconButton)`
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
        <Button onClick={() => onClick(game)}>
          <Wrapper $color={color}>
            {!isMobileResolution && (
              <Header name={name} platform={platform} region={region} />
            )}
            <DetailsWrapper>
              <Art src={art} />
              {variant && !isMobileResolution && <Variant variant={variant} />}
            </DetailsWrapper>
            <StyledIconButton {...props}>
              <DragIndicatorIcon />
            </StyledIconButton>
          </Wrapper>
        </Button>
      </div>
    );
  }
);
GameEntry.displayName = "GameEntry";

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
