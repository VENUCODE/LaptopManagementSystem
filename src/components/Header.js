import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiSun, FiMoon, FiSettings } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiMonitor,
  FiUserCheck,
  FiTool,
  FiBarChart2,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { useUser } from "../context/useUser";
import { Avatar } from "antd";

import { MdDashboard } from "react-icons/md";

const navigation = [
  { name: "Overview", href: "/", icon: <FiHome /> },
  { name: "Manage", href: "/manage", icon: <FiSettings /> },
  { name: "Assign", href: "/assign", icon: <FiUserCheck /> },
  { name: "Reports", href: "/reports", icon: <FiBarChart2 /> },
  { name: "Requests", href: "/requests", icon: <FiTool /> },
  { name: "Logs", href: "/logs", icon: <FiMonitor /> },
  { name: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
  { name: "Assigned", href: "/assignedlaptops", icon: <FiUserCheck /> },
  { name: "Request", href: "/requestlaptop", icon: <FiTool /> },
  { name: "Report", href: "/reportlaptop", icon: <FiBarChart2 /> },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const location = useLocation();
  const { logout, user, isAuthenticated } = useUser();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="sticky top-0 m-0 p-0 z-30">
      <nav className=" z-10 dark:bg-black-950 bg-slate-50 bg-opacity-15  bg-glass text-slate-300 dark:text-slate-50  ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <Link to="/" className="w-auto text-blue-900 dark:text-blue-50">
              <FiHome size={30} />
            </Link>

            <div className="md:hidden absolute left-[40px] flex items-center">
              <button
                onClick={() => setIsOffcanvasOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              >
                <FaBars className="block size-6" aria-hidden="true" />
              </button>
            </div>

            <div className="hidden md:block">
              <div className="flex space-x-4">
                {user.role === "admin" &&
                  navigation.slice(0, 6).map((item) => (
                    <Link
                      to={item.href}
                      key={item.name}
                      className={classNames(
                        ((currentPath === item.href ||
                          currentPath.startsWith(item.href)) &&
                          item.href !== "/") ||
                          (currentPath === "/" && item.href === "/")
                          ? " text-blue-600 underline dark:text-slate-100 bg-indigo-100   dark:bg-black   font-bold "
                          : "text-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:bg-opacity-30  ",
                        " dark:text-slate-50  rounded-full px-3 py-2 text-sm font-medium flex items-center gap-1 mt-2"
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                {user?.role === "employee" &&
                  navigation.slice(6).map((item) => (
                    <Link
                      to={item.href}
                      key={item.name}
                      className={classNames(
                        ((currentPath === item.href ||
                          currentPath.startsWith(item.href)) &&
                          item.href !== "/") ||
                          (currentPath === "/" && item.href === "/")
                          ? " text-blue-600 underline dark:text-slate-100 bg-indigo-100   dark:bg-black   font-bold "
                          : "text-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:bg-opacity-30  ",
                        " dark:text-slate-50  rounded-full px-3 py-2 text-sm font-medium flex items-center gap-1 mt-2"
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode((prev) => !prev)}
                className="p-2 rounded-md text-gray-400 hover:text-slate-300 dark:text-slate-50 hover:bg-primary-100 focus:outline-none"
              >
                {isDarkMode ? (
                  <FiSun className="size-6" />
                ) : (
                  <FiMoon className="size-6" />
                )}
              </button>

              <Menu as="div" className="relative">
                <MenuButton className="flex rounded-full bg-indigo-600 dark:bg-blue-400 text-sm focus:outline-none">
                  <Avatar className="uppercase text-lg outline outline-2 dark:outline-blue-200 shadow-md shadow-blue-lime-200 outline-indigo-500">
                    {user?.email?.split("").at(0)}
                  </Avatar>
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 w-full"
                        )}
                      >
                        {user?.email}
                      </button>
                    )}
                  </MenuItem>

                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => logout()}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-white w-100 rounded-md mx-auto bg-red-500"
                        )}
                      >
                        Sign Out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      {isOffcanvasOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed md:hidden inset-0 dark:bg-slate-950 opacity-50 z-40"
            onClick={() => setIsOffcanvasOpen(false)}
          ></div>

          {/* Off-canvas menu */}
          <div
            className={`fixed md:hidden inset-y-0 right-0 w-64 dark:bg-blue-950 bg-slate-50 shadow-lg z-50 overflow-y-auto transition-transform transform ${
              isOffcanvasOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 flex justify-between items-center border-b dark:text-blue-400 text-blue-900">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setIsOffcanvasOpen(false)}
                className="dark:text-blue-400 text-blue-900"
              >
                <IoClose size={24} />
              </button>
            </div>

            {isOffcanvasOpen && (
              <>
                {/* Overlay */}
                <div
                  className="fixed md:hidden inset-0 dark:bg-slate-950 opacity-50 z-40"
                  onClick={() => setIsOffcanvasOpen(false)}
                ></div>

                {/* Off-canvas menu */}
                <div
                  className={`fixed inset-y-0 right-0 w-64 bg-slate-50 dark:bg-blue-950 shadow-lg z-50 overflow-y-auto transition-transform transform ${
                    isOffcanvasOpen ? "translate-x-0" : "translate-x-full"
                  } duration-300 ease-in-out`}
                >
                  <div className="p-4 flex justify-between items-center border-b dark:text-blue-400 text-blue-900">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                      onClick={() => setIsOffcanvasOpen(false)}
                      className="dark:text-blue-400 text-blue-900"
                    >
                      <IoClose size={24} />
                    </button>
                  </div>

                  <div className="p-2">
                    {user?.role === "admin" &&
                      navigation.slice(0, 6).map((item) => (
                        <Link
                          to={item.href}
                          key={item.name}
                          onClick={() => setIsOffcanvasOpen(false)}
                          className={classNames(
                            ((currentPath === item.href ||
                              currentPath.startsWith(item.href)) &&
                              item.href !== "/") ||
                              (currentPath === "/" && item.href === "/")
                              ? "text-blue-600 underline dark:text-slate-100 bg-indigo-100 dark:bg-black font-bold"
                              : "text-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:bg-opacity-30",
                            "dark:text-slate-50 rounded-md px-3 py-2 text-sm font-medium flex items-center gap-1 mt-2"
                          )}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      ))}
                    {user?.role === "employee" &&
                      navigation.slice(6) &&
                      navigation.map((item) => (
                        <Link
                          to={item.href}
                          key={item.name}
                          onClick={() => setIsOffcanvasOpen(false)}
                          className={classNames(
                            ((currentPath === item.href ||
                              currentPath.startsWith(item.href)) &&
                              item.href !== "/") ||
                              (currentPath === "/" && item.href === "/")
                              ? "text-blue-600 underline dark:text-slate-100 bg-indigo-100 dark:bg-black font-bold"
                              : "text-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:bg-opacity-30",
                            "dark:text-slate-50 rounded-md px-3 py-2 text-sm font-medium flex items-center gap-1 mt-2"
                          )}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
