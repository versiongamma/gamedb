import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import MuiFab from '@mui/material/Fab';

import { PATHS, Page } from '../../routes';
import { useRouter } from 'next/router';
import useScreenResolution from '@/hooks/use-screen-resolution';

type Props = {
  activePage: Page;
  addGameHandler: () => void;
};

const Fab = ({ activePage, addGameHandler }: Props) => {
  const router = useRouter();
  const { isMobileResolution } = useScreenResolution();
  const pageToSwitchTo =
    activePage === Page.Collection ? Page.Wishlist : Page.Collection;

  const actions = [
    { icon: <AddIcon />, name: 'Add', onClick: addGameHandler },
    { icon: <SearchIcon />, name: 'Search' },
    {
      icon: <CachedIcon />,
      name: `Go to ${pageToSwitchTo}`,
      onClick: () => router.push(PATHS[pageToSwitchTo]),
    },
  ];

  if (!isMobileResolution) {
    return (
      <MuiFab
        onClick={addGameHandler}
        className="button absolute bottom-4 right-4 rounded-full"
      >
        <AddIcon />
      </MuiFab>
    );
  }

  return (
    <SpeedDial
      ariaLabel="speed-dial-fab"
      className="absolute bottom-4 right-4"
      FabProps={{ className: 'button  rounded-full' }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default Fab;
