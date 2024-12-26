import React, { useEffect, useState } from "react";

const Filters = ({ laptops, setCurrentLaptops }) => {
  const [filters, setFilters] = useState({
    employee: false,
    laptopStatus: false,
    maintenanceStatus: false,
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
        laptop?.status?.toLowerCase().includes(searchQuery);

      const maintenanceStatusMatch =
        !filters.maintenanceStatus ||
        laptop?.maintenanceStatus?.toLowerCase().includes(searchQuery);

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

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="search"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search laptops"
          className="w-full md:w-1/2 lg:w-1/ p-2 text-sm text-indigo-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-900 dark:text-white">Search by</p>
          <div className="flex  flex-row gap-2 ">
            <button
              onClick={() => toggleFilter("employee")}
              className={` rounded-md  text-sm px-2 py-1 ${
                filters.employee ? "filter-btn-active" : "filter-btn"
              }`}
            >
              Employee
            </button>
            <button
              onClick={() => toggleFilter("laptopStatus")}
              className={` rounded-md  text-sm px-2 py-1 ${
                filters.laptopStatus ? "filter-btn-active" : "filter-btn"
              }`}
            >
              Laptop Status
            </button>
            <button
              onClick={() => toggleFilter("maintenanceStatus")}
              className={` rounded-md  text-sm px-2 py-1 ${
                filters.maintenanceStatus ? "filter-btn-active" : "filter-btn"
              }`}
            >
              Maintenance Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
