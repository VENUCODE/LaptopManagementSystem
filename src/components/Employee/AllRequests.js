import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadingVariant, pageVariant, rowVariants } from "../../variants";

import { TableLoader } from "../Loaders/Loader";
import PaginateData from "../PaginateData";
import { FaLaptopFile } from "react-icons/fa6";
import { Divider } from "antd";
const EmployeeRequests = ({ data, loading }) => {
  const [filteredRequests, setfilteredRequests] = useState([]);
  const [curRequests, setCurRequests] = useState([]);
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = data?.filter(
      (issue) =>
        issue.status.toLowerCase().includes(term) ||
        issue.description.toLowerCase().includes(term) ||
        issue.createdAt.includes(term)
    );
    setCurRequests(filtered);
  };
  useEffect(() => {
    // setRequests(data);
    console.log(data);
  }, [data]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          variants={loadingVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex justify-center items-center w-full h-screen px-0 sm:px-2 md:px-0 overflow-x-hidden"
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
          className="container mx-auto px-0  flex flex-col"
        >
          <div className="text-2xl flex flex-row gap-2 sm:text-4xl ff-m  py-4 text-balance  font-bold drop-shadow-md  text-teal-400 dark:text-teal-500 ">
            <FaLaptopFile
              size={40}
              className="text-teal-500 dark:text-teal-500"
            />
            My Requests
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-900 dark:text-white mb-2">
              Search in requests
            </p>
            <input
              type="search"
              placeholder="Search by Laptop ID, Priority, Status, or Date"
              onChange={handleSearch}
              className="md:min-w-[50%] w-[90%] max-w-[400px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          <div className="relative w-full overflow-x-auto rounded-t-md container px-0 mx-auto min-h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Requested on
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {curRequests &&
                  curRequests?.map((request, index) => (
                    <motion.tr
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={rowVariants}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                        {request.description}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 w-100 text-center py-1 rounded-md text-xs ${
                            request.status === "rejected"
                              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                              : request.status === "pending"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                                : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                {curRequests && curRequests?.length === 0 && (
                  <motion.tr
                    key={0}
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={rowVariants}
                  >
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No requests found
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </table>
            <PaginateData
              items={data}
              itemsPerPage={10}
              setCurrentItems={setCurRequests}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmployeeRequests;
