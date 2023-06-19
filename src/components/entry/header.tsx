import { REGION_LABEL_MAP } from "@/utils/types";
import { Platform, Region } from "@/types";
import { styled } from "goober";

const Wrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 0 0.6rem;
`;

const TitleBody = styled("span")`
  font-size: 1rem;
  font-weight: 600;
`;

const HeaderDetailsWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin-right: 0.3rem;
  }
`;

const PlatformBody = styled("span")`
  font-size: 0.8rem;
  font-weight: 400;
`;

const RegionBody = styled("span")`
  font-size: 0.7rem;
  font-weight: 400;
`;

type Props = {
  name: string;
  platform?: Platform;
  region?: Region;
};

const Header = ({ name, platform, region }: Props) => (
  <Wrapper>
    <TitleBody>{name}</TitleBody>
    <HeaderDetailsWrapper>
      {platform && <PlatformBody>{platform}</PlatformBody>}
      {region && <RegionBody>({REGION_LABEL_MAP[region]})</RegionBody>}
    </HeaderDetailsWrapper>
  </Wrapper>
);

export default Header;
