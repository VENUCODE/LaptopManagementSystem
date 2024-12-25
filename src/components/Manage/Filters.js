import React, { useEffect, useMemo, useState } from "react";
import LaptopCard from "./LaptopCard";

const Filters = ({ laptops, setCurrentLaptops }) => {
  const [filters, setFilters] = useState({
    employee: "",
    laptopStatus: "",
    maintenanceStatus: "",
    search: "",
  });

  useEffect(() => {
    const filteredLaptops = laptops.filter((laptop) => {
      const employeeMatch =
        filters.employee === "" || laptop.employee === filters.employee;
      const laptopStatusMatch =
        filters.laptopStatus === "" || laptop.status === filters.laptopStatus;
      const maintenanceStatusMatch =
        filters.maintenanceStatus === "" ||
        laptop.maintenanceStatus === filters.maintenanceStatus;
      const searchMatch =
        laptop.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        laptop.model.toLowerCase().includes(filters.search.toLowerCase()) ||
        laptop.serialNumber
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      return (
        employeeMatch &&
        laptopStatusMatch &&
        maintenanceStatusMatch &&
        searchMatch
      );
    });
    setCurrentLaptops(filteredLaptops);
  }, [filters, laptops, setCurrentLaptops]);
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search by laptop name, brand, model, or serial number"
          className="w-full md:w-1/4 p-2 pl-10 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
        <select
          value={filters.employee}
          onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
          className="w-full md:w-1/4 p-2 pl-10 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          <option value="">All Employees</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Doe">Jane Doe</option>
        </select>
        <select
          value={filters.laptopStatus}
          onChange={(e) =>
            setFilters({ ...filters, laptopStatus: e.target.value })
          }
          className="w-full md:w-1/4 p-2 pl-10 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          <option value="">All Laptop Status</option>
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="In Maintenance">In Maintenance</option>
        </select>
        <select
          value={filters.maintenanceStatus}
          onChange={(e) =>
            setFilters({ ...filters, maintenanceStatus: e.target.value })
          }
          className="w-full md:w-1/4 p-2 pl-10 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          <option value="">All Maintenance Status</option>
          <option value="Up to Date">Up to Date</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
