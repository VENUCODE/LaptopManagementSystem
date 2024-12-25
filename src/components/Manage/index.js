import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Tab, TabGroup, TabList } from "@headlessui/react";

const tablinks = [
  { name: "List", link: "/list" },
  { name: "Add", link: "/add" },
];

const ManageLaptops = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col container  mx-auto mt-10  ">
      {/* Header Section */}
      <div className="pattern-light dark:pattern-dark">
        {/* Row for Heading and Tabs */}
        <div className="container-fluid relative ">
          <div className="flex justify-between flex-row items-center  bg-white bg-glass dark:bg-indigo-950  rounded-tl-md">
            <div className="text-2xl text-balance font-semibold text-blue-300 dark:text-blue-400 md:ms-4 ">
              Manage Laptops
            </div>
            <div className="bg-gray-100 dark:bg-slate-950 p-2 rounded-tr-md rounded-bl-md">
              <TabGroup>
                <TabList className=" flex flex-row gap-2  ">
                  {tablinks.map(({ name, link }) => (
                    <Tab
                      key={name}
                      onClick={() => navigate("/manage" + link)}
                      className={({ selected }) =>
                        `px-4 py-1 rounded-md text-md font-medium transition-all ${
                          selected
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                        }`
                      }
                    >
                      {name}
                    </Tab>
                  ))}
                </TabList>
              </TabGroup>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-white dark:bg-indigo-950  container p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLaptops;
