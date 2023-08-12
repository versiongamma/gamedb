import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Button from './input/button';
import useScreenResolution from '@/hooks/use-screen-resolution';
import IconButton from './input/icon-button';

const Login = () => {
  const [providerId, setProviderId] = useState('');
  const { data: session } = useSession();
  const { isMobileResolution } = useScreenResolution();

  useEffect(() => {
    const get = async () => {
      const providers = await getProviders();

      if (providers) {
        setProviderId(providers['google'].id);
      }
    };

    get();
  });

  if (!providerId) {
    return null;
  }

  if (session) {
    if (isMobileResolution) {
      return (
        <IconButton onClick={() => signOut()}>
          <LogoutIcon />
        </IconButton>
      );
    }
    return (
      <Button onClick={() => signOut()} endIcon={<LogoutIcon />}>
        Logout
      </Button>
    );
  }

  return (
    <Button onClick={() => signIn(providerId)} endIcon={<LoginIcon />}>
      Login
    </Button>
  );
};

export default Login;
