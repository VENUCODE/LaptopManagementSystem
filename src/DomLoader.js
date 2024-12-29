// import { CircleLoader } from "react-awesome-loaders";
import React from "react";
import { ImSpinner } from "react-icons/im";

const DomLoader = () => {
  return (
    <div className="h-screen z-50 fixed inset-0 bg-white dark:bg-slate-900 w-screen flex justify-center items-center">
      <div className="flex relative flex-row gap-3  justify-start items-center text-indigo-400 drop-shadow-md text-[2rem] font-bold dark:text-indigo-300/60">
        <ImSpinner
          size={40}
          className="text-indigo-400 dark:text-orange-400 animate-spin"
        />
        LOADING....
      </div>
    </div>
  );
};

export default DomLoader;
