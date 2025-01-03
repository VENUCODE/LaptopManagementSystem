import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";

const ManageLaptops = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      variants={pageVariant}
      className="min-h-screen flex flex-col container  mx-auto  "
    >
      <div className="mt-4 ">
        <div className="container-fluid relative ">
          <div className="flex justify-between flex-row items-start  bg-white bg-glass dark:bg-slate-950    rounded-t-md">
            <div className="text-2xl sm:text-4xl ff-m  py-4 text-balance  font-extrabold drop-shadow-md text-blue-400 dark:text-blue-500 ms-4 ">
              Manage Laptops
            </div>
            <div className="bg-gray-100 dark:bg-slate-950  shadow-inner shadow-gray-400/50 dark:shadow-blue-400/50 p-2 rounded-tr-md rounded-bl-md">
              <TabGroup>
                <TabList className="flex flex-row gap-2">
                  <Tab
                    onClick={() => navigate("/manage/add")}
                    className={`px-4 py-1  text-md font-medium transition-all ${
                      location.pathname === "/manage/add"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                    }`}
                  >
                    Add
                  </Tab>
                  <Tab
                    onClick={() => navigate("/manage/list")}
                    className={`px-4 py-1 text-md font-medium transition-all ${
                      location.pathname === "/manage/list" ||
                      location.pathname === "/manage"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                    }`}
                  >
                    List
                  </Tab>
                </TabList>
              </TabGroup>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-white dark:bg-slate-950 shadow-sm  container p-4">
        <Outlet />
      </div>
    </motion.div>
  );
};

export default ManageLaptops;
