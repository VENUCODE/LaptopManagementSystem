import React, { useEffect, useState } from "react";
import LaptopCard from "./LaptopCard"; // Make sure to import LaptopCard if it's in a separate file
import Filters from "./Filters";

import { useLaptop } from "../../context/useLaptops";
import { BsEmojiAstonishedFill, BsEmojiDizzy } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaLaptopMedical } from "react-icons/fa";

import PaginateData from "../PaginateData";

const LaptopCardContainer = () => {
  const { laptops, laptopLoading: loading } = useLaptop();
  const [filteredLaptops, setFilteredLaptops] = useState(laptops);
  const [currentLaptops, setCurrentLaptops] = useState(laptops);
  useEffect(() => {
    setFilteredLaptops(laptops);
  }, [laptops]);
  return (
    <div className="flex flex-col gap-4">
      <Filters laptops={laptops} setCurrentLaptops={setFilteredLaptops} />
      <div className="min-h-screen w-full">
        <p className="text-gray-500 dark:text-indigo-400 block text-xs py-2 text-right">
          {currentLaptops.length} laptops found
        </p>
        <div className="w-full h-full flex flex-row flex-wrap justify-evenly gap-3">
          {currentLaptops?.map((laptop, i) => (
            <LaptopCard index={i} key={i} laptop={laptop} />
          ))}
        </div>

        {!loading &&
          currentLaptops &&
          laptops &&
          laptops.length > 0 &&
          currentLaptops.length === 0 && (
            <div className="flex flex-row gap-3 items-center justify-center  mt-10  text-blue-400 dark:text-orange-400">
              <BsEmojiAstonishedFill
                size={50}
                className="text-indigo-400 dark:text-red-400"
              />
              NO MATCHES FOUND
            </div>
          )}
        {!loading && laptops && laptops.length === 0 && (
          <>
            <div className="flex  shadow-xl p-6 rounded-md   py-10 flex-col gap-3 justify-center items-center text-slate-400 text-[2rem] font-bold dark:text-indigo-300/60">
              <div className="flex flex-row gap-3 items-center">
                <BsEmojiDizzy
                  size={50}
                  className="text-indigo-400 dark:text-red-400"
                />
                NO LAPTOPS ADDED
              </div>

              <Link
                to="/manage/add"
                className=" animate-bounce text-sm ff-m dark:text-indigo-300 text-blue-500 underline mt-5 flex flex-row justify-center items-center gap-2"
              >
                <FaLaptopMedical className="animate-ping" size={30} /> Add
                Laptop One
              </Link>
            </div>
          </>
        )}
      </div>
      <PaginateData
        itemsPerPage={6}
        items={filteredLaptops}
        setCurrentItems={setCurrentLaptops}
      />
    </div>
  );
};

export default LaptopCardContainer;
