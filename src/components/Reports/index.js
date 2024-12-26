import React, { useState } from "react";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";
// Sample Laptop Issues Data
const laptopIssues = [
  {
    id: 1,
    laptopId: "LPT-001",
    priority: "High",
    reportedBy: "John Doe",
    status: "Open",
    reportedAt: "2024-06-01",
  },
  {
    id: 2,
    laptopId: "LPT-002",
    priority: "Medium",
    reportedBy: "Jane Smith",
    status: "In Progress",
    reportedAt: "2024-06-15",
  },
  {
    id: 3,
    laptopId: "LPT-003",
    priority: "Low",
    reportedBy: "Alice Johnson",
    status: "Resolved",
    reportedAt: "2024-06-20",
  },
];

const LaptopIssues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIssues, setFilteredIssues] = useState(laptopIssues);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = laptopIssues.filter(
      (issue) =>
        issue.laptopId.toLowerCase().includes(term) ||
        issue.priority.toLowerCase().includes(term) ||
        issue.reportedBy.toLowerCase().includes(term) ||
        issue.status.toLowerCase().includes(term) ||
        issue.reportedAt.includes(term)
    );
    setFilteredIssues(filtered);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      variants={pageVariant}
      className="container mx-auto p-6 flex flex-col"
    >
      {/* Search Bar */}
      <div className="mb-4">
        <p className="text-sm text-gray-900 dark:text-white mb-2">
          Search Laptop Issues
        </p>
        <input
          type="search"
          placeholder="Search by Laptop ID, Priority, Status, or Date"
          onChange={handleSearch}
          className="min-w-[50%] max-w-[400px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
      </div>

      {/* Laptop Issues Table */}
      <div className="relative w-full overflow-x-auto rounded-t-md container mx-auto min-h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Laptop ID
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
            {filteredIssues.map((issue) => (
              <tr
                key={issue.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {issue.laptopId}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      issue.priority === "High"
                        ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                        : issue.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                          : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{issue.reportedBy}</td>
                <td
                  className={`px-6 py-4 ${
                    issue.status === "Open"
                      ? "text-yellow-600"
                      : issue.status === "In Progress"
                        ? "text-blue-600"
                        : "text-green-600"
                  }`}
                >
                  {issue.status}
                </td>
                <td className="px-6 py-4">{issue.reportedAt}</td>
                <td className="px-6 py-4">
                  <button className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {filteredIssues.length === 0 && (
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
  );
};

export default LaptopIssues;
