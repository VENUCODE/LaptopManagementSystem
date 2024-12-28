import React, { createContext, useContext, useState } from "react";
import { endpoints, hosturl } from "../api";
import { useUser } from "./useUser";
import { message } from "antd";

const EmployeeLaptopsContext = createContext();

export const EmployeeLaptopsProvider = ({ children }) => {
  const [myLaptops, setLaptops] = useState([]);
  const [loadingGetLaptops, setLoadingGetLaptops] = useState(false);
  const [loadingReportLaptop, setLoadingReportLaptop] = useState(false);
  const [loadingReturnLaptop, setLoadingReturnLaptop] = useState(false);
  const [reportHistory, setReportHistory] = useState([]);
  const [loadingGetReportHistory, setLoadingGetReportHistory] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };
  const { authToken } = useUser();
  const getReportHistory = async (userId) => {
    setLoadingGetReportHistory(true);
    try {
      // Fetch report history from an API or database
      const response = await fetch(`/api/users/${userId}/reportHistory`);
      const data = await response.json();
      setReportHistory(data);
    } catch (error) {
      console.error("Failed to fetch report history", error);
    } finally {
      setLoadingGetReportHistory(false);
    }
  };
  const getLaptops = async () => {
    try {
      setLoadingGetLaptops(true);
      const response = await fetch(hosturl + endpoints.getlaptopAssinged, {
        headers: { Authorization: authToken },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setLaptops(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching laptops:", error);
    } finally {
      setLoadingGetLaptops(false);
    }
  };

  const reportLaptop = async (laptopId, description, priority) => {
    setLoadingReportLaptop(true);
    try {
      const response = await fetch(hosturl + endpoints.reportIssue, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ laptop: laptopId, description, priority }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      message.success(data.message);
      closeModal();
      setLoadingGetLaptops(false);
    } catch (error) {
      console.error("Failed to report laptop", error);
    } finally {
      setLoadingReportLaptop(false);
    }
  };

  const returnLaptop = async (laptopId) => {
    setLoadingReturnLaptop(laptopId);
    try {
      const response = await fetch(hosturl + endpoints.returnLaptop, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ laptopId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      message.success(data.message);
      getLaptops();
    } catch (error) {
      console.error(error.message, 1);
    } finally {
      setLoadingReturnLaptop(null);
    }
  };

  return (
    <EmployeeLaptopsContext.Provider
      value={{
        myLaptops,
        loadingGetLaptops,
        loadingReportLaptop,
        loadingReturnLaptop,
        loadingGetReportHistory,
        reportHistory,
        getLaptops,
        reportLaptop,
        returnLaptop,
        getReportHistory,
        modal: { open, closeModal, openModal },
      }}
    >
      {children}
    </EmployeeLaptopsContext.Provider>
  );
};
export const useEmployeeLaptops = () => {
  return useContext(EmployeeLaptopsContext);
};
