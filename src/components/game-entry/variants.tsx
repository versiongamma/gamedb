import { styled } from "goober";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

const Variant = styled("span")`
  font-size: 0.6rem;
  font-weight: 400;
  font-family: system-ui;
`;

type Props = {
  variants: string[];
};

const Variants = ({ variants }: Props) => {
  return (
    <Wrapper>
      {variants.map((v) => (
        <Variant key={v}>{v}</Variant>
      ))}
    </Wrapper>
  );
};

export default Variants;
