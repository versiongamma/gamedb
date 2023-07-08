import useScreenResolution from "@/hooks/use-screen-resolution";
import { GraphQLGame } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { styled } from "goober";
import React from "react";
import Header from "./header";
import Variant from "./variant";

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
  $isMobile?: boolean;
  children: React.ReactNode;
};

const Wrapper = styled<WrapperProps>("div")`
  width: fit-content;
  color: white;
  ${({ $isMobile }) => ($isMobile ? "min-width: 90px" : "min-width: 250px")};
  ${({ $isMobile }) => ($isMobile ? "" : "min-height: 310px")};
  background-color: ${({ $color }) => $color ?? "#eeeeee"};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  margin: ${({ $isMobile }) => ($isMobile ? "0.6rem" : "1rem")};

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

  @media screen and (max-width: 900px) {
    height: 100px;
    border-radius: 0.3rem;
  }
`;

type Props = {
  game: GraphQLGame;
  index?: number;
  onClick: (game: GraphQLGame) => void;
  moveTo?: (fromIndex: number, toIndex: number) => void;
  style?: Record<string, string | number | undefined>;
};

const GameEntry = React.forwardRef<HTMLDivElement, Props>(
  ({ game, index, onClick, moveTo, style, ...props }: Props, ref) => {
    const { name, platform, region, art, variant, color } = game;
    const { isMobileResolution } = useScreenResolution();

    return (
      <div ref={ref} style={style} {...props}>
        <Button onClick={() => onClick(game)}>
          <Wrapper $color={color} $isMobile={isMobileResolution}>
            {!isMobileResolution && (
              <Header name={name} platform={platform} region={region} />
            )}
            <DetailsWrapper>
              <Art src={art} />
              {variant && !isMobileResolution && <Variant variant={variant} />}
            </DetailsWrapper>
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
