import { message, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useUser } from "../../context/useUser";
import { endpoints, hosturl } from "../../api";
import EmployeeRequests from "./AllRequests";

const RequestLaptop = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [myrequests, setMyrequests] = useState([]);
  const { authToken } = useUser();
  const getMyrequest = useCallback(async () => {
    try {
      setPageLoading(true);
      const response = await fetch(hosturl + endpoints.getRequestsOfEmployee, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setMyrequests(data.data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setPageLoading(false);
    }
  }, [authToken]);

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(hosturl + endpoints.sendNewRequest, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      getMyrequest();
      message.success("Request Sent", 2);
      setDescription("");
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMyrequest();
  }, [getMyrequest]);
  return (
    <div className="min-h-screen px-10 py-4 bg-slate-50 w-full relative dark:bg-green-200/10 rounded-lg shadow-xl shadow-slate-300 dark:shadow-green-200/20 dark:outline dark:outline-1 dark:outline-green-200/40 transition-colors duration-300">
      <form
        onSubmit={handleRequest}
        className="container  px-0 sm:px-10 mx-auto"
      >
        <h2 className="text-xl ff-m font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Request a Laptop
        </h2>
        <textarea
          className="w-full required:border-red-500 p-2 mt-2 text-sm text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-md shadow-md shadow-slate-300 dark:shadow-slate-700 outline-none focus:ring-2 focus:ring-green-500"
          rows="4"
          required
          placeholder="Describe why you need a laptop..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 py-2 flex flex-row gap-2 w-auto px-4 float-right text-sm text-white rounded-md shadow-md shadow-blue-300/50 font-semibold outline-2 outline-blue-400 bg-blue-500/70 dark:bg-blue-500/80 dark:shadow-blue-300/80 dark:outline-blue-300/80 hover:bg-blue-500 hover:shadow-blue-500 hover:outline-blue-500 focus:bg-blue-500 focus:shadow-blue-500 focus:outline-blue-500"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" size={20} />
              Requesting...
            </>
          ) : (
            "Request Laptop"
          )}
        </button>
      </form>
      <div className="w-full h-full py-4">
        <EmployeeRequests loading={pageLoading} data={myrequests} />
      </div>
    </div>
  );
};

export default RequestLaptop;
