import { styled } from "goober";

export const Wrapper = styled("div")`
  width: fit-content;
  height: 300px;
  background-color: #dddddd;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  margin: 1rem;

  > * {
    margin: 0.8rem;
  }
`;

export const Header = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-left: 0.8rem;
`;

export const Title = styled("span")`
  font-size: 0.8rem;
  font-weight: 600;
  font-family: system-ui;
`;

export const HeaderDetailsWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin-right: 0.3rem;
  }
`;

export const Platform = styled("span")`
  font-size: 0.7rem;
  font-weight: 400;
  font-family: system-ui;
`;

export const Region = styled("span")`
  font-size: 0.5rem;
  font-weight: 400;
  font-family: system-ui;
`;

export const DetailsWrapper = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  > * {
    margin-right: 0.4rem;
  }
`;

export const Art = styled("img")`
  height: 210px;
`;
