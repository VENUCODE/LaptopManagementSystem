import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadingVariant, pageVariant } from "../../variants";
import { endpoints, hosturl } from "../../api";
import ReactTimeago from "react-timeago";
import { useUser } from "../../context/useUser";
import { message, Skeleton } from "antd";
import { TableLoader } from "../Loaders/Loader";

const LaptopIssues = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const { authToken } = useUser();
  const [loading, setLoading] = useState(false);
  const getIssues = async () => {
    try {
      setLoading(true);
      const response = await fetch(hosturl + endpoints.getissues, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      console.log(data);
      setIssues(data);
      setFilteredIssues(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleIssue = async (issueId, status, laptop) => {
    try {
      const response = await fetch(hosturl + endpoints.issueUpdate + issueId, {
        method: "PATCH",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, laptop }),
      });
      const data = await response.json();
      if (data.status === true) {
        message.success("Issue action updated");
        getIssues();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = issues.filter(
      (issue) =>
        issue.laptopId.toLowerCase().includes(term) ||
        issue.priority.toLowerCase().includes(term) ||
        issue.reportedBy.toLowerCase().includes(term) ||
        issue.status.toLowerCase().includes(term) ||
        issue.reportedAt.includes(term)
    );
    setFilteredIssues(filtered);
  };
  useEffect(() => {
    setFilteredIssues(issues);
  }, [issues]);
  useEffect(() => {
    getIssues();
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
          className="flex justify-center items-center w-full h-screen px-2 md:px-0 overflow-x-hidden"
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
          className="container mx-auto p-6 flex flex-col"
        >
          <div className="mb-4">
            <p className="text-sm text-gray-900 dark:text-white mb-2">
              Search Laptop Issues
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
                    SerialNumber
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reported By
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reported At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues &&
                  filteredIssues?.map((issue) => (
                    <tr
                      key={issue._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {issue.laptop?.serialNumber}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 w-100 text-center py-1 rounded-md text-xs ${
                            issue.priority === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                              : issue.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                                : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          }`}
                        >
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">{issue.employee?.email}</td>
                      <td
                        className={`px-6 py-4 ${
                          issue.status === "pending"
                            ? "text-yellow-400"
                            : "text-amber-600"
                        }`}
                      >
                        {issue.status}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <ReactTimeago date={issue.reportedAt} />
                      </td>
                      <td className="px-6 py-4 flex flex-col gap-y-2">
                        {issue.status === "raised" ? (
                          <button
                            onClick={() =>
                              handleIssue(
                                issue._id,
                                "pending",
                                issue.laptop._id
                              )
                            }
                            className="paginate-btn text-xs w-full outline     outline-2  py-1 flex justify-center outline-blue-500  dark:text-blue-400 dark:bg-blue-400/40 dark:hover:bg-blue-400 dark:hover:text-white"
                          >
                            Take Action
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleIssue(
                                issue._id,
                                "resolved",
                                issue.laptop._id
                              )
                            }
                            className="paginate-btn text-xs w-full outline   outline-2 py-1 flex justify-center outline-green-500 dark:text-green-400 dark:bg-green-400/40 dark:hover:bg-green-400 dark:hover:text-white"
                          >
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                {filteredIssues && filteredIssues.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No laptop issues found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LaptopIssues;
