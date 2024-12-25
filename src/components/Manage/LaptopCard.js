import React from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing the icons

const LaptopCard = ({ laptop }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md custom-bg p-4">
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
      <div className="flex justify-center gap-3 px-6 py-4">
        <button
          aria-label="View Laptop Details"
          className="bg-blue-500  flex-grow-1 bg-opacity-75 items-center justify-center  text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <FaEye className="text-white" />
        </button>
        <button
          aria-label="Update Laptop Details"
          className="bg-yellow-500  flex-grow-1 bg-opacity-75 items-center justify-center  text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        >
          <FaEdit className="text-white" />
        </button>
        <button
          aria-label="Delete Laptop"
          className="bg-red-500  flex-grow-1 bg-opacity-75 items-center justify-center  text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <FaTrashAlt className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default LaptopCard;
