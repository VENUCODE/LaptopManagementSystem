import React, { useState } from "react";
import ReactTimeago from "react-timeago";
import { useEmployeeLaptops } from "../../context/useEmployeeLaptops";
import ReportLaptop from "./ReportLaptop";
import { FaSpinner } from "react-icons/fa";

const LaptopCard = ({ laptop }) => {
  const [action, setAction] = useState(null);
  const { modal, returnLaptop, loadingReturnLaptop } = useEmployeeLaptops();
  const handleReturn = async (laptopId) => {
    await returnLaptop(laptopId);
  };
  return (
    <div className="px-10 py-6 flex flex-col justify-between bg-slate-50 w-full relative  hover:shadow-xl dark:bg-green-200/10 rounded-lg shadow-lg shadow-slate-300 dark:shadow-green-200/20 dark:outline dark:outline-1 dark:outline-green-200/40 transition-all duration-300">
      <span
        className={`px-2 absolute text-xs right-0 -top-[5px] text-white rounded-full shadow-xl animate-bounce  font-semibold ${laptop?.status === "assigned" ? "bg-green-500  shadow-green-500 " : laptop?.status === "available" ? "bg-orange-500  shadow-orange-500 " : "bg-red-500  shadow-red-500 "}`}
      >
        {laptop?.status}
      </span>
      <div className="">
        <h2 className="text-xl ff-m font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {laptop?.brand} -{laptop?.model}
        </h2>

        <p className="tracking-normal mt-2 text-sm text-gray-700 dark:text-slate-200">
          <span className="font-semibold ff-m ">Serial Number:</span>{" "}
          {laptop?.serialNumber}
        </p>
        <p className="tracking-normal mt-2 text-sm text-gray-700 dark:text-slate-200">
          <span className="font-semibold ff-m ">PurchaseDate:</span>{" "}
          {new Date(laptop.purchaseDate).toLocaleDateString()}
        </p>
        <p className="tracking-normal mt-2 text-sm text-gray-700 dark:text-slate-200">
          <span className="font-semibold ff-m ">Assigned On:</span>{" "}
          {new Date(laptop.createdAt).toLocaleDateString()}
        </p>
        <p className="tracking-normal mt-2 text-sm text-gray-700 dark:text-slate-200">
          <span className="font-semibold ff-m ">Using Since:</span>{" "}
          <ReactTimeago date={new Date(laptop?.createdAt)} />
        </p>
      </div>
      <div className="py-2 flex gap-2 mt-3">
        <button
          onClick={() => {
            setAction("report");
            modal.openModal();
          }}
          className={
            "text-center py-2 w-1/2 text-sm text-white rounded-md shadow-md shadow-red-300/50 font-semibold outline-2 outline-red-400 bg-red-500/80 dark:bg-red-500/80 dark:shadow-red-300/80 dark:outline-red-300/80 hover:bg-red-500 hover:shadow-red-500 hover:outline-red-500 focus:bg-red-500 focus:shadow-red-500 focus:outline-red-500"
          }
        >
          Report Issue
        </button>

        <button
          disabled={loadingReturnLaptop && loadingReturnLaptop === laptop.id}
          onClick={() => handleReturn(laptop.id)}
          className={
            "text-center  py-2 w-1/2 text-sm text-white rounded-md shadow-md shadow-blue-300/50 font-semibold outline-2 outline-blue-400 bg-blue-500/80 dark:bg-blue-500/80 dark:shadow-blue-300/80 dark:outline-blue-300/80 hover:bg-blue-500 hover:shadow-blue-500 hover:outline-blue-500 focus:bg-blue-500 focus:shadow-blue-500 focus:outline-blue-500"
          }
        >
          {loadingReturnLaptop && loadingReturnLaptop === laptop.id ? (
            <span className="flex flex-row gap-2 justify-center items-center mx-0 px-0">
              <FaSpinner className="animate-spin " size={25} /> Returning..
            </span>
          ) : (
            "Return Laptop"
          )}
        </button>
        {action && action === "report" && (
          <ReportLaptop
            brand={laptop.brand}
            model={laptop.model}
            serialNumber={laptop.serialNumber}
            id={laptop.id}
            setAction={setAction}
          />
        )}
        {action &&
          action === "return" &&
          {
            /* <ReportLaptop
            brand={laptop.brand}
            model={laptop.model}
            serialNumber={laptop.serialNUmber}
            id={laptop.id}
          /> */
          }}
      </div>
    </div>
  );
};

export default LaptopCard;
