import React, { useEffect, useState } from "react";

import LaptopCard from "./LaptopCard";

import { useEmployeeLaptops } from "../../context/useEmployeeLaptops";
import Loader from "../Loaders/Loader";
import { FaExclamation } from "react-icons/fa";

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

  return (
    <div className="flex flex-wrap gap-4 px-4 sm:px-2">
      <div className="w-full">
        {!loading && laptops && laptops.length > 0 && (
          <h3 className="text-white"> Laptops Assigned</h3>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-2">
          {loading && (
            <h1 className="ff-m fon-bold text-slate-500 dark:text-white">
              Loading.......
            </h1>
          )}
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
          <div className="flex flex-row gap-3 justify-center items-center text-slate-400 text-[2rem] font-bold dark:text-indigo-300/60">
            <FaExclamation
              size={50}
              className="text-indigo-400 dark:text-orange-400"
            />
            NO LAPTOPS ASSIGNED
          </div>
        )}
      </div>
    </div>
  );
};

export default Mylaptops;
