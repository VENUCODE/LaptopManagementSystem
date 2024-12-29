import { useState, useEffect } from "react";
import { Divider, message, Select, Button, Alert } from "antd";
import { useEmployee } from "../../context/useEmployee";

const { Option } = Select;

const EmployeeAssign = ({ empid }) => {
  const { unassignedLaptops, getUnassignedLaptops, assignLaptop, modal } =
    useEmployee();
  const [selectedLaptopId, setSelectedLaptopId] = useState(null);

  useEffect(() => {
    getUnassignedLaptops();
  }, [getUnassignedLaptops]);

  const handleAssign = async () => {
    if (!selectedLaptopId) {
      message.error("Please select a laptop before assigning.");
      return;
    }
    try {
      await assignLaptop(selectedLaptopId, empid);
      getUnassignedLaptops();
      modal.closeModal();
    } catch (error) {
      message.error("Failed to assign laptop. Please try again later.");
    }
  };

  return (
    <div className="m-0 p-0 w-full">
      <Divider orientation="left" orientationMargin={0}>
        Assign Laptop
      </Divider>
      <div className="outline outline-2 outline-indigo-500/80 m-0 p-4 rounded-md">
        {/* No Laptops Available */}
        {unassignedLaptops?.length === 0 ? (
          <Alert
            message="No laptops available for assignment."
            type="info"
            showIcon
            className="mb-4"
          />
        ) : (
          <>
            <label className="block mb-2 text-gray-700 dark:text-gray-200">
              Select a Laptop:
            </label>
            <Select
              placeholder="Select a laptop to assign"
              value={selectedLaptopId}
              onChange={(value) => setSelectedLaptopId(value)}
              className="w-full"
              allowClear
            >
              {unassignedLaptops?.map((laptop) => (
                <Option key={laptop._id} value={laptop._id}>
                  {laptop.brand} - {laptop.model}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              className="w-full mt-4"
              onClick={handleAssign}
              disabled={!selectedLaptopId}
            >
              Assign
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeAssign;
