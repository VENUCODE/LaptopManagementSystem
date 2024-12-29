import React, { useEffect, useState } from "react";

import LaptopCard from "./LaptopCard";

import { useEmployeeLaptops } from "../../context/useEmployeeLaptops";

import { FaExclamation, FaLaptopCode, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

import EmployeeAssigned from "./AssignedLaptops";
import { IoMdLogIn } from "react-icons/io";
import DomLoader from "../../DomLoader";

const Mylaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const {
    loadingGetLaptops: loading,
    getLaptops,
    myLaptops,
  } = useEmployeeLaptops();
  useEffect(() => {
    setLaptops(myLaptops);
  }, [myLaptops]);
  useEffect(() => {
    getLaptops();
  }, []);
  if (loading) {
    return <DomLoader />;
  }

  return (
    <div className="flex flex-wrap gap-4 px-4 sm:px-10">
      <div className="w-full">
        {!loading && laptops && laptops.length > 0 && (
          <div className="flex my-4 ms-2  sm:ms-4 drop-shadow-xl flex-row gap-3 justify-start items-center text-slate-400 text-[2rem] font-bold dark:text-indigo-300/60">
            <FaLaptopCode
              size={40}
              className="text-indigo-400 dark:text-orange-400"
            />
            LAPTOPS ASSIGNED
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-2">
          {!loading &&
            laptops?.map((laptop, index) => {
              const temp = {
                id: laptop.laptop._id,
                status: laptop.laptop.status,
                purchaseDate: laptop.laptop.purchaseDate,
                createdAt: laptop.createdAt,
                serialNumber: laptop.laptop.serialNumber,
                brand: laptop.laptop.brand,
                model: laptop.laptop.model,
              };
              return <LaptopCard laptop={temp} />;
            })}
        </div>
        {!loading && laptops && laptops.length === 0 && (
          <div className="flex bg-slate-200/50 shadow-xl  dark:bg-indigo-200/30 sm:container sm:mx-auto  py-10 flex-col gap-3 justify-center items-center text-slate-400 text-[2rem] font-bold dark:text-indigo-300/60">
            <div className="flex flex-row gap-3 items-center">
              <FaExclamation
                size={50}
                className="text-indigo-400 dark:text-red-400"
              />
              NO LAPTOPS ASSIGNED
            </div>

            <Link
              to="/request-laptop"
              className=" animate-bounce text-sm ff-m dark:text-yellow-300 text-blue-500 underline mt-5 flex flex-row justify-center items-center gap-2"
            >
              <IoMdLogIn className="animate-ping" size={30} /> Request One
            </Link>
          </div>
        )}
      </div>
      <div className="w-full min-h-screen scroll-x-hidden">
        <EmployeeAssigned />
      </div>
    </div>
  );
};

export default Mylaptops;
