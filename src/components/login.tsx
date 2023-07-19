import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

  if (session) {
    return (
      <Button
        onClick={() => signOut()}
        endIcon={<LogoutIcon />}
        disabled={!providerId}
      >
        Logout
      </Button>
    );
  }

  return (
    <Button
      onClick={() => signIn(providerId)}
      endIcon={<LoginIcon />}
      disabled={!providerId}
    >
      Login
    </Button>
  );
};

export default Login;
