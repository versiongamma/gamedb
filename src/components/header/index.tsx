import useScreenResolution from '@/hooks/use-screen-resolution';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/base/Input';

import Login from '../login';
import NavigationTabs from './navigation-tabs';
import useFilterStore from '@/hooks/use-filter-store';

const Header = () => {
  const { isMobileResolution } = useScreenResolution();
  const { filter, changeFilter } = useFilterStore();

  return (
    <Toolbar
      className="fixed z-10 m-0 grid w-screen grid-cols-3 bg-black/[0.2] backdrop-blur-xl xs:mb-6 xs:flex xs:justify-between xs:pl-0"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {!isMobileResolution && (
        <div className="flex space-x-2">
          <Image src="/ico.png" alt="logo" height={64} width={64} />
          <NavigationTabs />
        </div>
      )}
      <div className="flex w-full justify-center">
        <Input
          value={filter}
          className="align-center flex w-full justify-center space-x-1 px-4 py-4 md:rounded-2xl md:bg-black/[0.1] md:py-2"
          startAdornment={<SearchIcon />}
          slotProps={{
            input: {
              onChange: (event) => changeFilter(event.target.value),
              className:
                'w-full text-l font-normal bg-transparent border-none text-white focus-visible:outline-none',
            },
          }}
        />
      </div>
      <div className="flex justify-end">
        <Login />
      </div>
    </Toolbar>
  );
};

export default Header;
