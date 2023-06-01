import { signIn, getProviders, useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import Button from "./input/button";

const Login = () => {
  const [providerId, setProviderId] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const get = async () => {
      const providers = await getProviders();

      if (providers) {
        setProviderId(providers["google"].id);
      }
    };

    get();
  });

  if (!providerId) {
    return null;
  }

  if (session) {
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
