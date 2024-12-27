import { useState, useEffect } from "react";

import { Divider, message } from "antd";
import { useEmployee } from "../../context/useEmployee";

const EmployeeAssign = ({ empid }) => {
  const { unassignedLaptops, getUnassignedLaptops, assignLaptop, modal } =
    useEmployee();
  const [selectedLaptopId, setSelectedLaptopId] = useState(null);

  useEffect(() => {
    getUnassignedLaptops();
  }, [getUnassignedLaptops]);

  const handleAssign = async () => {
    if (!selectedLaptopId) {
      message.error("select laptop to assign");
    }
    await assignLaptop(selectedLaptopId, empid);
    getUnassignedLaptops();
    modal.closeModal();
  };

  return (
    <div className=" m-0 p-0 w-100 ">
      <Divider orientationMargin={0} orientation="left">
        Assign Laptop
      </Divider>
      <div className="outline outline-2 outline-indigo-500/80 m-0  p-4 rounded-md">
        <select
          className="w-full p-2 mt-2 border rounded"
          value={selectedLaptopId}
          onChange={(e) => setSelectedLaptopId(e.target.value)}
        >
          <option value={false} disabled>
            Select a laptop
          </option>
          {unassignedLaptops?.map((laptop) => (
            <option key={laptop._id} value={laptop._id}>
              {laptop.brand} - {laptop.model}
            </option>
          ))}
        </select>
        <button
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleAssign}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default EmployeeAssign;
