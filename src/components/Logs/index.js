import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadingVariant, pageVariant } from "../../variants";
import { useUser } from "../../context/useUser";
import { endpoints, hosturl } from "../../api";
import { actionColors, categoryColors } from "./cssUtils";
import ReactTimeago from "react-timeago";
import PaginateData from "../PaginateData";

import { TableLoader } from "../Loaders/Loader";

const Logs = () => {
  const [logData, setLogData] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const { authToken } = useUser();
  const [loading, setLoading] = useState(false);

  const getLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(hosturl + endpoints.getLogs, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      setLogData(data);
      setFilteredLogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = logData.filter(
      (log) =>
        log.action.toLowerCase().includes(term) ||
        log.description.toLowerCase().includes(term) ||
        log.category.toLowerCase().includes(term)
    );
    setFilteredLogs(filtered);
  };

  useEffect(() => {
    getLogs();
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
          className="absolute inset-0 flex justify-center items-center z-50 m-0 p-0"
        >
          <TableLoader />
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          variants={pageVariant}
          className="container mx-auto p-4  md:px-0 flex flex-col gap-6"
        >
          <div className="w-full mb-4">
            <p className="text-sm text-gray-900 dark:text-white mb-1">
              Search Logs
            </p>
            <input
              type="search"
              placeholder="Search by Action, Category, or Description"
              onChange={handleSearch}
              className="w-full max-w-[600px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          <div className="w-full overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow-md">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className={`px-6  text-center py-3`}>
                    Action
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    Logged Date
                  </th>
                  <th scope="col" className="px-6 text-center py-3 ">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPageData?.map((log, index) => (
                  <tr
                    key={log._id}
                    className={
                      index % 2 === 0
                        ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        : "bg-gray-100 border-b dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
                    }
                  >
                    <td className="px-4  py-2 md:py-4 text-center ">
                      <span className={actionColors[log.action]}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4  py-2 md:py-4 text-center text-nowrap">
                      <span className={categoryColors[log.category]}>
                        {log.category}
                      </span>
                    </td>
                    <td className="px-4  py-2 md:py-4 text-center text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {log.description}
                    </td>
                    <td className="px-4  py-2 md:py-4 text-xs text-center">
                      {new Date(log.loggedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4  py-2 md:py-4 text-center text-xs ">
                      <ReactTimeago date={new Date(log.loggedAt)} />
                    </td>
                  </tr>
                ))}
                {currentPageData.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-c2 py-4 mder s4:py-2 text-gray-500 dark:text-gray-400"
                    >
                      No logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="w-full flex justify-center mt-4">
            <PaginateData
              items={filteredLogs}
              itemsPerPage={5}
              setCurrentItems={setCurrentPageData}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Logs;
