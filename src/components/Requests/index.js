import React, { useState } from "react";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";
// Sample Request Data
const requests = [
  {
    id: 1,
    requestId: "REQ-001",
    type: "Hardware",
    raisedBy: "John Doe",
    status: "Pending",
    raisedAt: "2024-06-01",
  },
  {
    id: 2,
    requestId: "REQ-002",
    type: "Software",
    raisedBy: "Jane Smith",
    status: "In Progress",
    raisedAt: "2024-06-10",
  },
  {
    id: 3,
    requestId: "REQ-003",
    type: "Network",
    raisedBy: "Alice Johnson",
    status: "Resolved",
    raisedAt: "2024-06-15",
  },
];

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRequests, setFilteredRequests] = useState(requests);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = requests.filter(
      (request) =>
        request.requestId.toLowerCase().includes(term) ||
        request.type.toLowerCase().includes(term) ||
        request.raisedBy.toLowerCase().includes(term) ||
        request.status.toLowerCase().includes(term) ||
        request.raisedAt.includes(term)
    );
    setFilteredRequests(filtered);
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
          Search Requests
        </p>
        <input
          type="search"
          placeholder="Search by Request ID, Type, Status, or Date"
          onChange={handleSearch}
          className="min-w-[50%] max-w-[400px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
      </div>

      {/* Requests Table */}
      <div className="relative w-full overflow-x-auto rounded-t-md container mx-auto min-h-screen">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Request ID
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Raised By
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Raised At
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr
                key={request.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {request.requestId}
                </td>
                <td className="px-6 py-4">{request.type}</td>
                <td className="px-6 py-4">{request.raisedBy}</td>
                <td
                  className={`px-6 py-4 ${
                    request.status === "Pending"
                      ? "text-yellow-600"
                      : request.status === "In Progress"
                        ? "text-blue-600"
                        : "text-green-600"
                  }`}
                >
                  {request.status}
                </td>
                <td className="px-6 py-4">{request.raisedAt}</td>
                <td className="px-6 py-4">
                  <button className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Requests;
