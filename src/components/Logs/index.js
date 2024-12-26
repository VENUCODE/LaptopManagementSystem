import React, { useState } from "react";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";
// Sample Log Data
const logs = [
  {
    id: 1,
    laptopId: "LPT-001",
    employeeName: "John Doe",
    action: "Issued",
    date: "2024-06-01",
  },
  {
    id: 2,
    laptopId: "LPT-002",
    employeeName: "Jane Doe",
    action: "Returned",
    date: "2024-06-02",
  },
  {
    id: 3,
    laptopId: "LPT-003",
    employeeName: "Bob Smith",
    action: "Updated",
    date: "2024-06-03",
  },
  {
    id: 4,
    laptopId: "LPT-004",
    employeeName: "Alice Johnson",
    action: "Issued",
    date: "2024-06-04",
  },
];

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(logs);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = logs.filter(
      (log) =>
        log.employeeName.toLowerCase().includes(term) ||
        log.laptopId.toLowerCase().includes(term) ||
        log.action.toLowerCase().includes(term)
    );
    setFilteredLogs(filtered);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      variants={pageVariant}
      className="container-fluid mx-4 md:px-8 lg:px-16 flex justify-center flex-col"
    >
      {/* Search Bar */}
      <div className="container mx-auto my-3">
        <p className="text-sm text-gray-900 dark:text-white mb-1">
          Search Logs
        </p>
        <input
          type="search"
          placeholder="Search by Laptop ID, Employee Name, or Action"
          onChange={handleSearch}
          className="min-w-[50%] max-w-[400px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
      </div>

      {/* Log Table */}
      <div className="relative w-full overflow-x-auto rounded-t-md container mx-auto min-h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Laptop ID
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {log.laptopId}
                </td>
                <td className="px-6 py-4">{log.employeeName}</td>
                <td
                  className={`px-6 py-4 ${
                    log.action === "Issued"
                      ? "text-green-600"
                      : log.action === "Returned"
                        ? "text-yellow-600"
                        : "text-blue-600"
                  }`}
                >
                  {log.action}
                </td>
                <td className="px-6 py-4">{log.date}</td>
                <td className="px-6 py-4">
                  <button className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Logs;
