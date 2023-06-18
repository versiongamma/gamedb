import axios from "axios";
import { useEffect, useState } from "react";

const useEnv = () => {
  const [env, setEnv] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    const getEnvVars = async () => {
      const { data } = await axios.post<Record<string, string | undefined>>(
        "/api/env"
      );
      setEnv(data);
    };

    getEnvVars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return env;
};

export default useEnv;
