import { Switch } from "antd";
import React, { useEffect, useState } from "react";

const Filters = ({ laptops, setCurrentLaptops }) => {
  const [filters, setFilters] = useState({
    search: "",
    laptopStatus: "",
    sortOrder: "asc",
  });

  useEffect(() => {
    let filteredLaptops = [...(laptops || [])];

    if (filters.search) {
      const searchQuery = filters.search.toLowerCase();
      filteredLaptops = filteredLaptops.filter((laptop) =>
        [
          laptop?.brand,
          laptop?.model,
          laptop?.serialNumber,
          laptop?.employee,
          laptop?.email,
        ]
          .filter(Boolean) // Ignore null or undefined fields
          .some((field) => field.toLowerCase().includes(searchQuery))
      );
    }

    if (filters.laptopStatus) {
      filteredLaptops = filteredLaptops.filter(
        (laptop) =>
          laptop?.status?.toLowerCase() === filters.laptopStatus.toLowerCase()
      );
    }

    filteredLaptops.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return filters.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setCurrentLaptops(filteredLaptops);
  }, [filters, laptops, setCurrentLaptops]);

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
        <div className="flex-grow w-full md:w-1/2">
          <p className="text-xs text-gray-900 dark:text-white">Search</p>
          <input
            type="search"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search laptops"
            className="w-full p-2 text-sm text-indigo-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 rounded-md outline outline-2 outline-gray-300 dark:outline-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>

        <div className="relative flex-grow w-full md:w-1/2 pt-4 gap-2 flex flex-col md:flex-row items-center">
          <select
            value={filters.laptopStatus}
            onChange={(e) => handleFilterChange("laptopStatus", e.target.value)}
            className="w-full md:w-2/3 p-2 text-sm text-indigo-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 rounded-md outline outline-2 outline-gray-300 dark:outline-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="maintenance">Maintenance</option>
            <option value="assigned">Assigned</option>
          </select>

          <Switch
            checked={filters.sortOrder === "asc"}
            onChange={(checked) =>
              handleFilterChange("sortOrder", checked ? "asc" : "desc")
            }
            className="min-w-[100px] max-w-[200px] mt-2 md:mt-0 shadow-md outline outline-1 outline-indigo-500 shadow-slate-500 dark:shadow-indigo-500"
            checkedChildren="Newest"
            unCheckedChildren="Oldest"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
