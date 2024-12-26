import React, { useEffect, useState } from "react";

const Filters = ({ laptops, setCurrentLaptops }) => {
  const [filters, setFilters] = useState({
    employee: false,
    laptopStatus: "",
    maintenanceStatus: "",
    search: "",
  });

  useEffect(() => {
    const filteredLaptops = laptops.filter((laptop) => {
      const searchQuery = filters.search.toLowerCase();

      const employeeMatch =
        !filters.employee ||
        laptop?.employee?.toLowerCase().includes(searchQuery) ||
        laptop?.email?.toLowerCase().includes(searchQuery);

      const laptopStatusMatch =
        !filters.laptopStatus ||
        laptop?.status?.toLowerCase() === filters.laptopStatus.toLowerCase();

      const maintenanceStatusMatch =
        !filters.maintenanceStatus ||
        laptop?.maintenanceStatus?.toLowerCase() ===
          filters.maintenanceStatus.toLowerCase();

      const generalSearchMatch =
        !filters.employee &&
        !filters.laptopStatus &&
        !filters.maintenanceStatus &&
        (laptop?.name?.toLowerCase().includes(searchQuery) ||
          laptop?.brand?.toLowerCase().includes(searchQuery) ||
          laptop?.model?.toLowerCase().includes(searchQuery) ||
          laptop?.serialNumber?.toLowerCase().includes(searchQuery));

      return (
        (filters.employee && employeeMatch) ||
        (filters.laptopStatus && laptopStatusMatch) ||
        (filters.maintenanceStatus && maintenanceStatusMatch) ||
        generalSearchMatch
      );
    });

    setCurrentLaptops(filteredLaptops);
  }, [filters, laptops, setCurrentLaptops]);

  // Toggle Filter Buttons
  const toggleFilter = (filterKey) => {
    setFilters({ ...filters, [filterKey]: !filters[filterKey] });
  };

  // Handle Change for Dropdown
  const handleDropdownChange = (filterKey, value) => {
    setFilters({ ...filters, [filterKey]: value });
  };

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="flex flex-row flex-wrap-reverse justify-center  gap-4 mb-4">
        <div className="flex-grow-1 min-w-[300px] ">
          <p className="text-xs text-gray-900 dark:text-white">Search by</p>
          <input
            type="search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search laptops"
            className="w-full p-2 text-sm dark:shadow-md  dark:shadow-blue-600/40  text-indigo-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 rounded-md outline outline-2 dark:outline-gray-700 outline-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>
        <div className="flex flex-col  gap-1 lg:w-2/3 md:2/3">
          <p className="text-xs text-gray-900 dark:text-white text-center">
            Search by
          </p>
          <div className="flex flex-row flex-wrap-reverse justify-center gap-2 ">
            <button
              onClick={() => toggleFilter("employee")}
              className={`dark:shadow-md  dark:shadow-blue-600/40 rounded-md text-sm px-2 py-1 ${
                filters.employee ? "filter-btn-active" : "filter-btn"
              }`}
            >
              Employee
            </button>

            {/* Laptop Status Dropdown */}
            <div className="relative">
              <select
                value={filters.laptopStatus}
                onChange={(e) =>
                  handleDropdownChange("laptopStatus", e.target.value)
                }
                className=" dark:shadow-md  dark:shadow-blue-600/40 rounded-md text-sm px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              >
                <option value="">Select Laptop Status</option>
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="issue">Issue</option>
                <option value="maintenance">Under Maintenance</option>
              </select>
            </div>

            {/* Maintenance Status Dropdown */}
            <div className="relative">
              <select
                value={filters.maintenanceStatus}
                onChange={(e) =>
                  handleDropdownChange("maintenanceStatus", e.target.value)
                }
                className=" dark:shadow-md  dark:shadow-blue-600/40 rounded-md text-sm px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              >
                <option value="">Select Maintenance Status</option>
                <option value="under maintenance">Under Maintenance</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
