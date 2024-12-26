import React, { useState } from "react";

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "IT",
    laptops: ["Laptop 1", "Laptop 2"],
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    department: "HR",
    laptops: ["Laptop 3"],
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bob@example.com",
    department: "Marketing",
    laptops: ["Laptop 4", "Laptop 5"],
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice@example.com",
    department: "Finance",
    laptops: ["Laptop 6"],
  },
  {
    id: 5,
    name: "Mike Brown",
    email: "mike@example.com",
    department: "Sales",
    laptops: ["Laptop 7", "Laptop 8"],
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@example.com",
    department: "IT",
    laptops: ["Laptop 9"],
  },
];

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className="container-fluid sm:px-4 md:px-8 lg:px-16 flex justify-center flex-col">
      <div className="container mx-auto  my-3">
        <p className="text-sm text-gray-900 dark:text-white mb-1">
          Search Employee
        </p>
        <input
          type="search"
          placeholder="Search Employee by name or email"
          className="min-w-[50%] max-w-[400px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
      </div>
      <div className="relative w-full overflow-x-auto  rounded-t-md container mx-auto min-h-screen">
        <table className="w-full text-sm text-left rtl:text-left   text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {employee.name}
                </td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4 text-right">
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;
