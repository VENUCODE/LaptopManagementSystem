import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./useUser";
import { endpoints, hosturl } from "../api";
import { message } from "antd";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const { authToken } = useUser();
  const [pageLoading, setPageLoading] = useState(false);
  const [unassignedLaptops, setUnassignedLaptops] = useState([]);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const getAllEmployees = async () => {
    try {
      setPageLoading(true);
      const response = await fetch(hosturl + endpoints.getemployees, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();

      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setPageLoading(false);
    }
  };

  const getEmployee = async (id) => {
    try {
      const response = await fetch(hosturl + endpoints.getemployee + id, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      return { data, status: true };
    } catch (error) {
      console.error("Error fetching employee:", error);
      return { status: false, message: error.message };
    }
  };
  const assignLaptop = async (laptopId, employeeId) => {
    try {
      const response = await fetch(hosturl + endpoints.assignLaptop, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ laptop: laptopId, employee: employeeId }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign laptop");
      }
      message.success("Laptop Assigned", 1);
    } catch (error) {
      message.success("Failed To assign Laptop try again", 2);
      console.error("Error assigning laptop:", error.message);
    }
  };

  const getUnassignedLaptops = async () => {
    try {
      const response = await fetch(hosturl + endpoints.getunassignedlaptops, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch laptops");
      }

      const data = await response.json();
      if (data.status === false) {
        throw new Error(data.message);
      }
      // console.log(data.laptops);
      setUnassignedLaptops(data.laptops);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const unassignLaptop = async (assignId) => {
    try {
      if (!assignId) {
        message.error("No Laptop assignemet id", 1);
        return;
      }
      const response = await fetch(
        hosturl + endpoints.unassignLaptop + assignId,
        {
          method: "PUT",
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to unassign laptop");
      }
      message.success("Unassigned Laptop successfully", 1);
    } catch (error) {
      console.error("Error unassign laptop:", error);
      message.error("Failed to unassign laptop", 1);
    } finally {
      closeModal();
    }
  };
  useEffect(() => {
    getAllEmployees();
    getUnassignedLaptops();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        pageLoading,
        unassignedLaptops,
        getUnassignedLaptops,
        getAllEmployees,
        getEmployee,
        assignLaptop,
        unassignLaptop,
        modal: { open, openModal, closeModal },
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  return useContext(EmployeeContext);
};
