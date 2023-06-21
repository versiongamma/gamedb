import { useEffect, useState } from "react";
import parser, { IResult } from "ua-parser-js";

const defaultDeviceInformation: IResult = {
  ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/114.0",
  browser: {
    name: "Firefox",
    version: "114.0",
    major: "114",
  },
  engine: {
    name: "Gecko",
    version: "109.0",
  },
  os: {
    name: "Mac OS",
    version: "10.15",
  },
  device: {
    vendor: "Apple",
    model: "Macintosh",
    type: "",
  },
  cpu: {
    architecture: "",
  },
};

const useScreenResolution = () => {
  const [device, setDevice] = useState<IResult>(defaultDeviceInformation);

  useEffect(() => {
    if (window) {
      const UA = window.navigator.userAgent;
      setDevice(new parser(UA).getResult());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window]);

  return device;
};

export default useScreenResolution;
