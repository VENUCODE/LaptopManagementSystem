import { CircleLoader } from "react-awesome-loaders";
import React from "react";

const DomLoader = () => {
  return (
    <>
      <CircleLoader
        meshColor={"#6366F1"}
        lightColor={"#E0E7FF"}
        duration={1.5}
        desktopSize={"90px"}
        mobileSize={"64px"}
      />
    </>
  );
};

export default DomLoader;
