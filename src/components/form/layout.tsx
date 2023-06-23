import { styled } from "goober";

export const Form = styled("div")`
  display: flex;
  flex-direction: column;
  width: 500px;
  overflow-x: hidden;

  @media screen and (max-width: 900px) {
    width: 70vw;
  }
`;
