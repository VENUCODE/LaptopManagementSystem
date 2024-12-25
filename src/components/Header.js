import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { FaBars, FaCross, FaTimes } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  FiHome,
  FiMonitor,
  FiUserCheck,
  FiTool,
  FiAlertCircle,
  FiBarChart2,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const navigation = [
  { name: "Overview", href: "/", icon: <FiMonitor />, current: false },
  { name: "Assign", href: "/assign", icon: <FiUserCheck />, current: false },
  { name: "Logs", href: "/logs", icon: <FiTool />, current: false },
  { name: "Issues", href: "/issues", icon: <FiAlertCircle />, current: false },
  { name: "Reports", href: "/reports", icon: <FiBarChart2 />, current: false },
  { name: "Profile", href: "/profile", icon: <FiUser />, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const location = useLocation(); // Get the current location
  const [currentPath, setCurrentPath] = useState(location.pathname); // Initialize state with pathname

  useEffect(() => {
    setCurrentPath(location.pathname); // Update state when pathname changes
  }, [location]);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      {/* Navbar */}
      <nav className="dark:bg-black-950 bg-glass text-slate-300 dark:text-slate-50 shadow-md rounded-md ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <Link to="/" className="w-auto text-blue-900 dark:text-blue-50">
              <FiHome size={30} />
            </Link>

            <div className="sm:hidden absolute left-[40px] flex items-center">
              <button
                onClick={() => setIsOffcanvasOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              >
                <FaBars className="block size-6" aria-hidden="true" />
              </button>
            </div>

            <div className="hidden sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    to={item.href}
                    key={item.name}
                    className={classNames(
                      item.href === currentPath
                        ? " text-blue-600 underline dark:text-slate-100 bg-opacity-45    font-bold "
                        : "text-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:bg-opacity-30  ",
                      " dark:text-slate-50 rounded-md px-3 py-2 text-sm font-medium flex items-center gap-1 mt-2"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Actions: Theme Toggle & Profile */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-md text-gray-400 hover:text-slate-300 dark:text-slate-50 hover:bg-primary-100 focus:outline-none"
              >
                {isDarkMode ? (
                  <FiSun className="size-6" />
                ) : (
                  <FiMoon className="size-6" />
                )}
              </button>

              {/* Profile Dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="User"
                  />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Sign Out
                      </a>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      {/* Offcanvas Sidebar */}
      {isOffcanvasOpen && (
        <>
          <div
            className="fixed  lg:hidden md:hidden inset-0 dark:bg-slate-950  opacity-50 z-40"
            onClick={() => setIsOffcanvasOpen(false)}
          ></div>

          <div className="fixed lg:hidden md:hidden inset-y-0 right-0 w-64 dark:bg-blue-950 bg-slate-50 shadow-lg z-50 overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b dark:text-blue-400 text-blue-900">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setIsOffcanvasOpen(false)}
                className=" dark:text-blue-400 text-blue-900"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="p-2">
              {navigation.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  onClick={() => setIsOffcanvasOpen(false)}
                  className={classNames(
                    item.href === currentPath
                      ? " text-slate-600 dark:text-slate-100 dark:bg-blue-700 bg-opacity-45 font-bold "
                      : "text-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:bg-opacity-30  ",
                    " dark:text-slate-50 rounded-md px-3 py-2 text-sm font-medium flex items-center gap-1 mt-2"
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
    </>
  );
}