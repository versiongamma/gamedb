import { styled } from "goober";

export const PageWrapper = styled("div")`
  && {
    padding-top: 64px;
    height: 100vh;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    @media screen and (max-width: 900px) {
      padding-top: 40px;
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const PageLoadWrapper = styled("div")`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;
