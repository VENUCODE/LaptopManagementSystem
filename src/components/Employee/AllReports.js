import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadingVariant, pageVariant, rowVariants } from "../../variants";

import { TableLoader } from "../Loaders/Loader";
import { endpoints, hosturl } from "../../api";
import { useUser } from "../../context/useUser";
import { FaExclamation } from "react-icons/fa";
import PaginateData from "../PaginateData";

const EmployeeReports = () => {
  const { authToken } = useUser();
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState();
  const [filteredReports, setFilteredReports] = useState([]);
  const [currentReports, setCurrentReports] = useState([]);
  const getMyreports = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(hosturl + endpoints.getMyReports, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setReports(data.data);
      setFilteredReports(data.data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = reports?.filter(
      (issue) =>
        issue.status.toLowerCase().includes(term) ||
        issue.description.toLowerCase().includes(term) ||
        issue.createdAt.includes(term)
    );
    setFilteredReports(filtered);
  };
  useEffect(() => {}, []);
  useEffect(() => {
    getMyreports();
  }, [getMyreports]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          variants={loadingVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex justify-center items-center w-full h-screen px-2 md:px-0 overflow-x-hidden"
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
          className="container mx-auto p-6 flex flex-col"
        >
          <div className="text-2xl sm:text-4xl ff-m  py-4 text-balance  font-extrabold drop-shadow-md  text-red-400 dark:text-red-500 ">
            My Reports
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-900 dark:text-white mb-2">
              Search in reports
            </p>
            <input
              type="search"
              placeholder="Search by Laptop ID, Priority, Status, or Date"
              onChange={handleSearch}
              className="md:min-w-[50%] w-[90%] max-w-[400px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          <div className="relative w-full overflow-x-auto rounded-t-md container mx-auto min-h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3">
                    description
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs">
                    ReportedOn/ResolvedOn
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentReports &&
                  currentReports?.map((report, index) => (
                    <motion.tr
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={rowVariants}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 w-100 text-center py-1 rounded-md text-xs ${
                            report.status === "raised"
                              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                              : report.status === "pending"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                                : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 w-100 text-center py-1 rounded-md text-xs ${
                            report.priority === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                              : report.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                                : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          }`}
                        >
                          {report.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-medium max-w-[30ch] text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap dark:text-white">
                        {report.description}
                      </td>
                      <td className="px-6 flex flex-row justify-between gap-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <span>
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                        --
                        <span>
                          {report.resolvedAt === null
                            ? "yet to resolve"
                            : new Date(report.resolvedAt).toLocaleDateString()}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                {currentReports && currentReports.length === 0 && (
                  <motion.tr
                    key={0}
                    custom={0}
                    initial="hidden"
                    // animate="visible"
                    whileInView="visible"
                    exit="exit"
                    variants={rowVariants}
                  >
                    <td colSpan="4" className="text-center py-4">
                      <span className="flex flex-row gap-3 justify-center items-center text-slate-400 text-[2rem] font-bold dark:text-indigo-300/60">
                        <FaExclamation
                          size={50}
                          className="text-indigo-400 dark:text-orange-400"
                        />
                        NO REPORTS YET
                      </span>
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </table>
            <PaginateData
              items={filteredReports}
              itemsPerPage={10}
              setCurrentItems={setCurrentReports}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmployeeReports;
