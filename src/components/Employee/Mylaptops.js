import React from "react";
import {
  FaBarcode,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import ReactTimeago from "react-timeago";

const laptops = [
  {
    brand: "Dell",
    model: "XPS 13",
    serialNumber: "12345",
    purchaseDate: "2022-01-01",
    createdAt: "2022-01-01T12:00:00Z",
    status: "assigned",
  },
];

const showModal = (action) => {
  console.log(`Show modal for ${action}`);
};

const Mylaptops = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {laptops.map((laptop, index) => (
        <div
          key={index}
          className="w-full sm:w-[250px] md:w-[300px] lg:w-[300px] xl:w-[300px] 2xl:w-[300px] max-w-[300px] min-w-[250px] rounded overflow-hidden dark:outline-2 outline-blue-500 hover:outline hover:outline-gray-200 custom-bg p-4 dark:shadow-inner shadow-sm dark:shadow-blue-600/40 dark:hover:shadow-md dark:hover:bg-blue-800 dark:hover:bg-opacity-30 dark:hover:shadow-blue-900/40 dark:hover:outline dark:hover:outline-blue-600 hover:bg-slate-50 hover:shadow-md hover:bg-opacity-30"
        >
          <div className="px-6 py-4">
            {laptop.status && (
              <span
                className={`inline-block float-right px-2 text-xs font-semibold rounded-full ${
                  laptop.status === "assigned"
                    ? "bg-orange-200 dark:bg-red-200/50 text-red-800 dark:text-red-400"
                    : laptop.status === "available"
                      ? "bg-green-200 dark:bg-green-200/50 text-green-800 dark:text-green-400"
                      : "bg-amber-200 dark:bg-amber-200/50 text-amber-800 dark:text-amber-400"
                }`}
              >
                {laptop.status.charAt(0).toUpperCase() + laptop.status.slice(1)}
              </span>
            )}
            <h3 className="font-bold text-xl mb-2 text-ellipsis overflow-hidden whitespace-nowrap text-slate-700 dark:text-slate-200">
              {laptop.brand || "Laptop Brand"}
            </h3>
            <p className="text-slate-700 font-mono dark:text-slate-300 text-base mb-2 text-ellipsis overflow-hidden whitespace-nowrap">
              {laptop.model || "Model XYZ"}
            </p>
            <div className="text-slate-700 flex-col dark:text-slate-300 text-sm mb-2 flex justify-start">
              <div className="flex flex-row items-center">
                <FaBarcode size={"25"} className="mr-2" />
                Serial Number
              </div>
              <span className="w-full ps-9 font-semibold">
                {laptop.serialNumber}
              </span>
            </div>
            <p className="text-slate-700 flex-col dark:text-slate-300 text-sm mb-2 flex justify-start">
              <p className="flex flex-row items-center">
                <FaCalendarAlt className="mr-2" size={"20"} />
                Purchase Date:
              </p>
              <span className="w-full ps-9 font-semibold">
                {new Date(laptop.purchaseDate).toLocaleDateString()}
              </span>
            </p>
            <p className="text-slate-700 flex-col dark:text-slate-300 text-sm mb-2 flex justify-start">
              <p className="flex flex-row items-center">
                <FaCalendarAlt className="mr-2" size={"20"} />
                Added:
              </p>
              <span className="w-full ps-9 text-gray-400 dark:text-slate-400">
                <ReactTimeago date={laptop.createdAt} />
              </span>
            </p>
          </div>
          <div className="flex justify-center gap-2 px-6 py-4">
            <button
              aria-label="View Laptop Details"
              onClick={() => showModal("view")}
              className="w-14 bg-opacity-10 hover:text-white hover:bg-opacity-90 text-center bg-blue-500 text-blue-600 p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <FaEye className="mx-auto" size={15} />
            </button>
            <button
              onClick={() => showModal("edit")}
              aria-label="Update Laptop Details"
              className="w-14 bg-opacity-10 hover:text-white hover:bg-opacity-90 bg-yellow-500 text-yellow-600 p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            >
              <FaEdit className="mx-auto" size={15} />
            </button>
            <button
              aria-label="Delete Laptop"
              onClick={() => showModal("delete")}
              className="w-14 bg-opacity-10 hover:text-white hover:bg-opacity-90 bg-red-500 text-red-600 p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <FaTrashAlt className="mx-auto" size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mylaptops;
