import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageVariant } from "../../variants";
import { useEmployee } from "../../context/useEmployee";
import PaginatedTable from "../Paginate";
import { Modal } from "antd";
import DetailEmployee from "./DetailEmployee";

const columns = ["name", "email", "department"];
const AssignLaptop = () => {
  const { employees, getEmployee, modal } = useEmployee();
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [employeeDetail, setEmployeeDetail] = useState(null);

  const getEmployeeDetail = async (id) => {
    try {
      console.log(id);
      modal.openModal();
      const res = await getEmployee(id);
      if (res.status === true) {
        setEmployeeDetail(res.data);
        console.log(employeeDetail);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term) ||
        employee.department?.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
  };
  useEffect(() => {
    if (employees) {
      setFilteredEmployees([...employees, ...employees]);
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
      <div className="container mx-auto  my-3">
        <p className="text-sm text-gray-900 dark:text-white mb-1">
          Search Employee
        </p>
        <input
          type="search"
          onChange={handleSearch}
          placeholder="Search Employee by name or email"
          className="min-w-[50%] max-w-[400px] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
      </div>
      <div className="relative w-full overflow-x-auto  rounded-t-md container mx-auto min-h-screen">
        <PaginatedTable
          itemsPerPage={5}
          items={filteredEmployees}
          columns={columns}
          action={getEmployeeDetail}
        />
      </div>
      <Modal
        footer={null}
        open={modal.open}
        onCancel={() => {
          modal.closeModal();
          setEmployeeDetail(null);
        }}
        destroyOnClose
      >
        <DetailEmployee data={employeeDetail} setData={setEmployeeDetail} />
      </Modal>
    </motion.div>
  );
};

export default AssignLaptop;
