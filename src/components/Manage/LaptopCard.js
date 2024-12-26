import React from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing the icons

const LaptopCard = ({ laptop }) => {
  return (
    <div className="w-full sm:w-[250px] md:w-[300px] lg:w-[300px] xl:w-[300px] 2xl:w-[300px] max-w-[300px] min-w-[250px] rounded overflow-hidden dark:outline-2 outline-blue-500 hover:outline hover:outline-gray-200 custom-bg p-4 dark:shadow-inner shadow-sm dark:shadow-blue-600/40 dark:hover:shadow-md dark:hover:bg-blue-800 dark:hover:bg-opacity-30 dark:hover:shadow-blue-900/40 dark:hover:outline dark:hover:outline-blue-600 hover:bg-slate-50 hover:shadow-md hover:bg-opacity-30">
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2 text-ellipsis overflow-hidden whitespace-nowrap text-slate-700 dark:text-slate-200">
          {laptop.name || "Laptop Name"}
        </h3>
        <p className="text-slate-700 dark:text-slate-300 text-base mb-2 text-ellipsis overflow-hidden whitespace-nowrap">
          Brand: {laptop.brand || "Laptop Brand"}
        </p>
        <p className="text-slate-700 dark:text-slate-300 text-base mb-2 text-ellipsis overflow-hidden whitespace-nowrap">
          Model: {laptop.model || "Model XYZ"}
        </p>
        <p className="text-slate-700 dark:text-slate-300 text-base mb-2">
          Price: ${laptop.price || "999.99"}
        </p>
      </div>
      <div className="flex justify-center gap-2 px-6 py-4">
        <button
          aria-label="View Laptop Details"
          className="w-14 bg-opacity-10 hover:text-white hover:bg-opacity-90 text-center bg-blue-500 text-blue-600 p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <FaEye className=" mx-auto" size={15} />
        </button>
        <button
          aria-label="Update Laptop Details"
          className="w-14 bg-opacity-10 hover:text-white hover:bg-opacity-90 bg-yellow-500 text-yellow-600 p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        >
          <FaEdit className=" mx-auto" size={15} />
        </button>
        <button
          aria-label="Delete Laptop"
          className="w-14 bg-opacity-10 hover:text-white hover:bg-opacity-90 bg-red-500 text-red-600 p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <FaTrashAlt className=" mx-auto" size={15} />
        </button>
      </div>
    </div>
  );
};

export default LaptopCard;
