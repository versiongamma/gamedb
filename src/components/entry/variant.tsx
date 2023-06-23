import { styled } from "goober";

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 0.4rem;
`;

const VariantBody = styled("span")`
  font-size: 0.7rem;
  font-weight: 400;
`;

type Props = {
  variant: string;
};

const Variant = ({ variant }: Props) => {
  return (
    <Wrapper>
      <VariantBody>{variant}</VariantBody>
    </Wrapper>
  );
};

export default Variant;
