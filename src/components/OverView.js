import React, { useState, useEffect } from "react";

import CountsGraph from "./Charts/CountsGraph";
import { motion } from "framer-motion";
import { endpoints, hosturl } from "../api";
import { useUser } from "../context/useUser";
import Loader from "./Loaders/Loader";
import { FaComputer, FaUserPen } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";

const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

export default function Grid() {
  const [counts, setCounts] = useState({});
  const { authToken } = useUser();
  const [loading, setLoading] = useState(false);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const response = await fetch(hosturl + endpoints.getcounts, {
        headers: { Authorization: authToken },
      });
      const data = await response.json();
      setCounts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  if (loading) {
    return (
      <motion.div
        variants={fadeVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        className="py-12 sm:py-16 container-fluid custom-bg pattern-light dark:pattern-dark"
      >
        <p className="text-md sm:text-xl text-center text-indigo-400 dark:text-indigo-50 font-semibold mb-12 mt-4">
          Loading inventory data...
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="lg:col-span-2 md:col-span-1 col-span-1 container-fluid lg:px-4 justify-center">
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 h-full">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 p-4"
                >
                  <Loader className="h-6 w-full rounded-md mb-4" />
                  <Loader className="h-4 w-1/3 rounded-md mb-2" />
                  <Loader className="h-2 w-full rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="lg:col-span-2 md:col-span-1 col-span-1 container-fluid lg:px-4 justify-center">
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 h-full">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 p-4"
                >
                  <Loader className="h-6 w-full rounded-md mb-4" />
                  <Loader className="h-4 w-1/3 rounded-md mb-2" />
                  <Loader className="h-2 w-full rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="lg:col-span-2 md:col-span-1 col-span-1 container-fluid lg:px-4 justify-center">
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 h-full">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 p-4"
                >
                  <Loader className="h-6 w-full rounded-md mb-4" />
                  <Loader className="h-4 w-1/3 rounded-md mb-2" />
                  <Loader className="h-2 w-full rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, delay: 0.5 }}
      className="py-8 sm:py-4 container-fluid custom-bg pattern-light dark:pattern-dark "
    >
      {/* <p className="md:text-4xl text-md text-center heading-1">
        Inventory Overview
      </p> */}

      <div className="container mx-auto mt-2 mb-8">
        <p className="text-2xl text-start flex flex-row items-end gap-3 text-cyan-400 dark:text-indigo-50 font-semibold mt-2 mb-6">
          <FaComputer size={40} className="text-cyan-700 dark:text-blue-600" />
          Laptops Overview
        </p>
        <div className="grid gap-5 xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
          <div>
            <CountsGraph
              value={counts.laptops?.total}
              total={counts.laptops?.total}
              colorIndex={3}
              title="Total"
            />
          </div>
          <div>
            <CountsGraph
              value={counts.laptops?.available}
              total={counts.laptops?.total}
              colorIndex={1}
              title="Available"
            />
          </div>
          <div>
            <CountsGraph
              value={counts.laptops?.assigned}
              total={counts.laptops?.total}
              colorIndex={2}
              title="Assigned"
            />
          </div>
          <div>
            <CountsGraph
              value={counts.laptops?.maintenance}
              total={counts.laptops?.total}
              colorIndex={0}
              title="Maintenance"
            />
          </div>
        </div>
        <p className="text-2xl text-start flex flex-row items-center gap-3 text-indigo-400 dark:text-indigo-50 font-semibold mt-8 mb-6">
          <FaUserPen size={40} className="text-amber-700 dark:text-rose-600" />
          Issues Overview
        </p>

        <div className="grid gap-5 xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
          <div>
            <CountsGraph
              value={counts.issues?.total}
              total={counts.issues?.total}
              colorIndex={3}
              title="Total"
            />
          </div>
          <div>
            <CountsGraph
              value={counts.issues?.resolved}
              total={counts.issues?.total}
              colorIndex={1}
              title="Resolved"
            />
          </div>
          <div>
            <CountsGraph
              value={counts.issues?.pending}
              total={counts.issues?.total}
              colorIndex={0}
              title="Pending"
            />
          </div>
        </div>
        <p className="text-2xl text-start flex flex-row items-end gap-3 text-indigo-400 dark:text-indigo-50 font-semibold mt-8 mb-6">
          <FaFileInvoice
            size={30}
            className="text-indigo-700 dark:text-blue-600"
          />
          Requests Overview
        </p>

        <div className="grid gap-5 xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
          <div>
            <CountsGraph
              value={counts.requests?.total}
              total={counts.requests?.total}
              colorIndex={3}
              title="Total"
            />
          </div>
          <div>
            <CountsGraph
              value={counts.requests?.approved}
              total={counts.requests?.total}
              colorIndex={1}
              title="Approved"
            />
          </div>
          <div>
            <CountsGraph
              value={counts.requests?.pending}
              total={counts.requests?.total}
              colorIndex={2}
              title="Pending"
            />
          </div>
          <div>
            <CountsGraph
              value={counts.requests?.rejected}
              total={counts.requests?.total}
              colorIndex={0}
              title="Rejected"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
