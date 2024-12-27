import React, { createContext, useState, useContext } from "react";

// Create a context
const DashboardContext = createContext();

// Create a provider component
export const DashboardProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [report, setReport] = useState(null);
  const [request, setRequest] = useState(null);
  const [returnStatus, setReturnStatus] = useState(null);

  const getHistory = () => {
    // Implement the logic to get history
    // Example: setHistory(fetchedHistory);
  };

  const reportLaptop = (reportDetails) => {
    // Implement the logic to report a laptop
    // Example: setReport(reportDetails);
  };

  const requestLaptop = (requestDetails) => {
    // Implement the logic to request a laptop
    // Example: setRequest(requestDetails);
  };

  const returnLaptop = (returnDetails) => {
    // Implement the logic to return a laptop
    // Example: setReturnStatus(returnDetails);
  };

  return (
    <DashboardContext.Provider
      value={{
        history,
        report,
        request,
        returnStatus,
        getHistory,
        reportLaptop,
        requestLaptop,
        returnLaptop,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the DashboardContext
export const useDashboard = () => {
  return useContext(DashboardContext);
};
