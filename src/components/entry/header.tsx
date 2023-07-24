import { Platform, Region } from "@/types";
import { REGION_LABEL_MAP } from "@/utils/types";

type Props = {
  name: string;
  platform?: Platform;
  region?: Region;
};

const Header = ({ name, platform, region }: Props) => (
  <div className="w-full flex flex-col items-start py-0 px-2">
    <span className="font-medium text-base">{name}</span>
    <div className="flex flex-row items-center space-x-1">
      {platform && <span className="text-sm">{platform}</span>}
      {region && <span className="text-xs">({REGION_LABEL_MAP[region]})</span>}
    </div>
  </div>
);

export default Header;
