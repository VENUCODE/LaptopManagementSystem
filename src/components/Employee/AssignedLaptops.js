import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadingVariant, pageVariant, rowVariants } from "../../variants";
import { TableLoader } from "../Loaders/Loader";
import PaginateData from "../PaginateData";
import { useUser } from "../../context/useUser";
import { endpoints, hosturl } from "../../api";
import ReactTimeago from "react-timeago";
import { FaHistory } from "react-icons/fa";

const EmployeeAssigned = () => {
  const [assigned, setAssigned] = useState([]);
  const [filteredAssigned, setfilteredAssigned] = useState([]);
  const [curAssigned, setCurAssigned] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authToken } = useUser();
  const getAssignedLog = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(hosturl + endpoints.getEmployeeAssigned, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setAssigned(data.data);
      setfilteredAssigned(data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [authToken]);
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = assigned?.filter(
      (assigned) =>
        assigned.assignedAt.toLowerCase().includes(term) ||
        assigned.laptop.serialNumber.toLowerCase().includes(term) ||
        assigned.laptop.brand.toLowerCase().includes(term) ||
        assigned.laptop.model.toLowerCase().includes(term)
    );
    setfilteredAssigned(filtered);
  };
  useEffect(() => {
    getAssignedLog();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          variants={loadingVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex justify-center items-center w-full h-full scroll-x-hidden"
        >
          <TableLoader cols={3} />
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          variants={pageVariant}
          className=" w-full mx-auto pt-6 scroll-x-hidden   px-1 sm:px-4  flex flex-col"
        >
          <div className="flex my-10 ms-2 sm:ms-4 drop-shadow-xl flex-row gap-3 justify-start items-center text-slate-400 text-[2rem] font-bold dark:text-indigo-300/60">
            <FaHistory
              size={40}
              className="text-teal-400 dark:text-orange-400"
            />
            YOUR ASSIGNED HISTORY
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-900 dark:text-white mb-2">
              Search in Laptops
            </p>
            <input
              type="search"
              placeholder="Search by Laptop ID, Priority, Status, or Date"
              onChange={handleSearch}
              className="md:min-w-[50%] w-[90%] max-w-[400px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          <div className="relative w-full scroll-x-hidden rounded-t-md  mx-auto min-h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Serial Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Brand-model
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Assigned On
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Returned On
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {curAssigned &&
                  curAssigned?.map((assigned, index) => (
                    <motion.tr
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={rowVariants}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                        {assigned.laptop?.serialNumber}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {assigned.laptop?.brand}-{assigned.laptop?.model}
                      </td>
                      <td className="px-6 py-4 flex flex-col font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {new Date(assigned.assignedAt).toLocaleDateString()}
                        <span className="text-xs text-gray-400 dark:text-indigo-300">
                          <ReactTimeago date={new Date(assigned.assignedAt)} />
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {assigned.returnedAt
                          ? new Date(assigned.returnedAt).toLocaleDateString()
                          : "yet to return"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 w-100 text-center py-1 rounded-md text-xs ${
                            assigned.laptop?.status === "maintenance"
                              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                              : assigned.laptop?.status === "assigned"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                                : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          }`}
                        >
                          {assigned.returnedAt !== null
                            ? "Returned"
                            : "Yet to return"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                {curAssigned && curAssigned?.length === 0 && (
                  <motion.tr
                    key={0}
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={rowVariants}
                  >
                    <td
                      colSpan="5"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No assigned Laptops so far
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </table>
            <PaginateData
              items={filteredAssigned}
              itemsPerPage={10}
              setCurrentItems={setCurAssigned}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmployeeAssigned;
