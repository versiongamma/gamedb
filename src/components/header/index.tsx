import useScreenResolution from '@/hooks/use-screen-resolution';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Login from '../login';
import NavigationTabs from './navigation-tabs';

const Header = () => {
  const { isMobileResolution } = useScreenResolution();

  return (
    <Toolbar
      className=" fixed z-10 m-0 flex w-screen justify-between bg-black/[0.2] backdrop-blur-xl xs:mb-6"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {!isMobileResolution ? (
        <span className="flex space-x-2">
          <Image src="/ico.png" alt="logo" height={64} width={64} />
          <NavigationTabs />
        </span>
      ) : (
        <span />
      )}
      <Login />
    </Toolbar>
  );
};

export default Header;
