import { styled } from "goober";

export const PageWrapper = styled("div")`
  padding-top: 64px;
  height: 100vh;
  overflow-y: auto;

  @media screen and (max-width: 900px) {
    padding-top: 40px;
  }
`;
