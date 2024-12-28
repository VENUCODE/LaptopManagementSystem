import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadingVariant, pageVariant } from "../../variants";
import { useEmployee } from "../../context/useEmployee";
import PaginatedTable from "../Paginate";
import { Modal } from "antd";
import DetailEmployee from "./DetailEmployee";
import { useSearchParams } from "react-router-dom";
import { FaExclamation } from "react-icons/fa";
import { TableLoader } from "../Loaders/Loader";

const columns = ["name", "email", "department"];

const AssignLaptop = () => {
  const { employees, getEmployee, modal, pageLoading } = useEmployee();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employeeDetail, setEmployeeDetail] = useState(null);
  const [searchParams] = useSearchParams();
  const [notify, setNotify] = useState(null);

  let emailParam = searchParams.get("email");
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
    setSearchTerm(e.target.value);
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
      let filtered = [...employees];

      if (emailParam) {
        filtered = filtered.filter((employee) =>
          employee.email.toLowerCase().includes(emailParam.toLowerCase())
        );
        setNotify({ content: "Assign laptop to " + emailParam });
        setTimeout(() => {
          setNotify(null);
        }, 8000);
        setSearchTerm(emailParam);
      }

      setFilteredEmployees(filtered);
    }
  }, [employees, emailParam]);

  return (
    <AnimatePresence mode="wait">
      {pageLoading ? (
        <motion.div
          key="loading"
          variants={loadingVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex justify-center items-center w-full h-screen px-2 md:px-0 overflow-x-hidden"
        >
          <TableLoader />
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          variants={pageVariant}
          className="container mx-auto p-2 sm:px-6 flex flex-col min-h-screen"
        >
          <div className="container  sm:mx-auto my-3 px-2 sm:px-0 ">
            <p className="text-sm text-gray-900 dark:text-white mb-1">
              Search Employee
            </p>
            <input
              type="search"
              onChange={handleSearch}
              value={searchTerm}
              placeholder="Search Employee by name or email"
              className="min-w-[50%] max-w-[400px] w-[90%] p-2 text-sm text-indigo-700 outline outline-2 dark:outline-gray-700 outline-gray-300 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          {notify && (
            <div className=" w-1/2 flex justify-center items-center mx-auto text-sm  rounded-full text-center m-2  outline outline-info dark:outline-lime-500 outline-red-500 dark:bg-lime-300/40 bg-red-300/20 py-2  dark:text-lime-300 text-red-500">
              <FaExclamation />
              {notify.content}
            </div>
          )}
          <div className="relative  px-2 justify-center   sm:px-0 rounded-t-md container  min-h-full ">
            <PaginatedTable
              itemsPerPage={10}
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
      )}
    </AnimatePresence>
  );
};

export default AssignLaptop;
