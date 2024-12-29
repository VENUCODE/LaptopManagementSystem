import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./useUser";
import { endpoints, hosturl } from "../api";
import { message } from "antd";

const LaptopContext = createContext();

export const LaptopProvider = ({ children }) => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [laptopLoading, setLaptopLoading] = useState(false);
  const { authToken } = useUser();

  const getAllLaptops = async () => {
    setLaptopLoading(true);
    try {
      const response = await fetch(hosturl + endpoints.getlaptops, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();

      setLaptops(data);
    } catch (error) {
      console.error("Error fetching laptops:", error);
    } finally {
      setLaptopLoading(false);
    }
  };

  const getLaptopById = async (id, setLoading) => {
    try {
      setLoading(true);
      const response = await fetch(hosturl + endpoints.getlaptop + id, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });
      const data = await response.json();
      return { data, status: true };
    } catch (error) {
      console.error("Error fetching laptop:", error);
      return { data: null, status: false };
    } finally {
      setLoading(false);
    }
  };

  const addLaptop = async (data, setLoading) => {
    try {
      setLoading(true);
      console.log(authToken);
      const response = await fetch(hosturl + endpoints.addnewlaptop, {
        method: "POST",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === true) {
        getAllLaptops();
        message.success("Laptop added successfully");
      } else {
        message.error("Failed to add laptop");
      }
    } catch (error) {
      message.error("Error adding laptop:" + error.message, 1);
    } finally {
      setLoading(false);
    }
  };
  const deleteLaptop = async (id, setLoading) => {
    try {
      if (!id) {
        message.error("Laptop ID is required for deletion");
        return;
      }
      setLoading(id);
      const response = await fetch(`${hosturl}${endpoints.deletelaptop}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authToken,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete laptop. Status: ${response.status}`);
      }
      const result = await response.json();

      if (result?.status === true) {
        getAllLaptops();
        message.success("Laptop deleted successfully");
      } else {
        console.log(result);
        message.error(result?.message || "Failed to delete laptop");
      }
    } catch (error) {
      console.error("Delete Laptop Error:", error);
      message.error("Error deleting laptop: " + error.message, 2);
    } finally {
      setLoading(null);
    }
  };

  const updateLaptop = async (id, values, setLoading) => {
    try {
      setLoading(true);
      const response = await fetch(hosturl + "/api/laptops/update/" + id, {
        method: "PUT",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (result.status === true) {
        getAllLaptops();
        message.success("Laptop updated successfully");
      } else {
        message.error("Failed to update laptop");
      }
    } catch (error) {
      message.error("Error updating laptop:" + error.message, 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      getAllLaptops();
    }
  }, [authToken]);

  return (
    <LaptopContext.Provider
      value={{
        loading,
        laptops,
        getAllLaptops,
        getLaptopById,
        addLaptop,
        deleteLaptop,
        updateLaptop,
        laptopLoading,
      }}
    >
      {children}
    </LaptopContext.Provider>
  );
};

export const useLaptop = () => {
  return useContext(LaptopContext);
};
