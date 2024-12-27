import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";
import { useEmployee } from "../../context/useEmployee";
import PaginatedTable from "../Paginate";

const columns = ["laptopSerialNumber", "assignedOn", "returnedOn", "laptopBrand", "laptopModel"];

const ViewStatus = () => {
    const { employees } = useEmployee();
    const [filteredEmployees, setFilteredEmployees] = useState(employees);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = employees.filter(
            (employee) =>
                employee.laptopSerialNumber.toLowerCase().includes(term) ||
                employee.laptopBrand.toLowerCase().includes(term) ||
                employee.laptopModel.toLowerCase().includes(term)
        );
        setFilteredEmployees(filtered);
    };

    useEffect(() => {
        if (employees) {
            setFilteredEmployees(employees);
        }
    }, [employees]);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            variants={pageVariant}
            className="container-fluid sm:px-4 md:px-8 lg:px-16 flex justify-center flex-col"
        >
            <div className="container mx-auto my-3">
                <p className="text-sm text-gray-900 dark:text-white mb-1">
                    Search Laptop Assignment Log
                </p>
                <input
                    type="search"
                    onChange={handleSearch}
                    placeholder="Search by laptop serial number, brand or model"
                    className="min-w-[50%] max-w-[400px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
            </div>
            <div className="relative w-full overflow-x-auto rounded-t-md container mx-auto min-h-screen">
                <PaginatedTable
                    itemsPerPage={5}
                    items={filteredEmployees}
                    columns={columns}
                />
            </div>
        </motion.div>
    );
};

export default ViewStatus;
