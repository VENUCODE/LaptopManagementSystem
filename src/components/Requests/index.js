import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadingVariant, pageVariant } from "../../variants";
import { endpoints, hosturl } from "../../api";
import ReactTimeago from "react-timeago";
import { useUser } from "../../context/useUser";
import { message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { TableLoader } from "../Loaders/Loader";

const LaptopRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const { authToken } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getrequests = async () => {
    try {
      const response = await fetch(hosturl + endpoints.getrequests, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      setRequests(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = requests.filter(
      (request) =>
        request.status.toLowerCase().includes(term) ||
        request.employee.email.toLowerCase().includes(term) ||
        request.status.toLowerCase().includes(term) ||
        request.createdAt.includes(term)
    );
    setFilteredRequests(filtered);
  };
  const requestAction = async (id, status) => {
    try {
      const response = await fetch(hosturl + endpoints.requestAction + id, {
        method: "PUT",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      message.success(data.message, 1);
      getrequests();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRequestAction = async (action, id, email) => {
    try {
      setLoading(true);
      if (action === "approved") {
        await requestAction(id, "approved");
        navigate(`/assign?email=${encodeURIComponent(email)}`, {
          replace: true,
        });
      } else if (action === "reject") {
        await requestAction(id, "rejected");
      }
    } catch (error) {
      console.log(error.messsage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setFilteredRequests(requests);
  }, [requests]);
  useEffect(() => {
    getrequests();
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
          className="absolute inset-0 flex justify-center items-center  z-50"
        >
          <TableLoader />
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          variants={loadingVariant}
          className="container mx-auto p-4 md:px-0 flex flex-col"
        >
          <div className="mb-4">
            <p className="text-sm text-gray-900 dark:text-white mb-2">
              Search Laptop requests
            </p>
            <input
              type="search"
              placeholder="Search by Laptop ID, Priority, Status, or Date"
              onChange={handleSearch}
              className="min-w-[50%] max-w-[400px] w-[90%] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          <div className="relative w-full overflow-x-auto rounded-t-md container mx-auto min-h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    RequestedBy
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Requested
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests &&
                  filteredRequests?.map((request) => (
                    <tr
                      key={request._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {request.employee?.email}
                      </td>
                      <td className="px-6 py-4 ">
                        <span
                          className={`px-2  py-1 rounded-md text-xs ${"bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {request.description}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <ReactTimeago date={request.createdAt} />
                      </td>

                      <td className="px-6 py-4">
                        <button
                          className="bg-green-400/40 w-full text-xs hover:bg-green-400 hover:text-white  mt-2 p-1 rounded text-green-500"
                          onClick={() =>
                            handleRequestAction(
                              "approved",
                              request._id,
                              request.employee?.email
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-400/40 w-full text-xs hover:bg-red-400 hover:text-white   mt-2 p-1 rounded text-red-500"
                          onClick={() =>
                            handleRequestAction("reject", request._id)
                          }
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                {filteredRequests && filteredRequests.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No laptop requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Modal></Modal>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LaptopRequests;
