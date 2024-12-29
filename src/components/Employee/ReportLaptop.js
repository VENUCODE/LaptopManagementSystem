import React, { useState } from "react";
import { Modal, Input, message, Radio } from "antd";
import { useEmployeeLaptops } from "../../context/useEmployeeLaptops";

const ReportLaptop = ({ brand, model, serialNumber, id, setAction }) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const { modal, reportLaptop, loadingReportLaptop } = useEmployeeLaptops();

  const handleOk = async () => {
    if (description.trim() === "") {
      message.info("Issue Description can't be empty");
      return;
    }
    if (priority === "") {
      message.info("Please select a priority level");
      return;
    }
    await reportLaptop(id, description, priority);
    setAction(null);
  };

  return (
    <>
      <Modal
        title="Report Laptop"
        open={modal.open}
        onOk={handleOk}
        onCancel={() => {
          setAction(null);
          modal.closeModal();
        }}
        className="p-4"
      >
        <div className="space-y-4">
          <div className="text-md font-bold text-gray-800">
            <p>
              <span className="font-semibold text-gray-600">Brand:</span>{" "}
              {brand}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Model:</span>{" "}
              {model}
            </p>
            <p>
              <span className="font-semibold text-gray-600">
                Serial Number:
              </span>{" "}
              {serialNumber}
            </p>
          </div>
          <label className="block text-md font-bold text-gray-700">
            Issue description{" "}
          </label>
          <Input.TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-2 border rounded-md"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Priority Level:
            </label>
            <Radio.Group
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
              className="flex space-x-4 mt-2"
            >
              <Radio value="low" className="text-blue-600">
                <span className="font-bold">Low</span>
              </Radio>
              <Radio value="medium" className="text-yellow-600">
                <span className="font-bold">Medium</span>
              </Radio>
              <Radio value="high" className="text-red-600">
                <span className="font-bold">High</span>
              </Radio>
            </Radio.Group>
          </div>

          {loadingReportLaptop && (
            <div className="text-center mt-4 animate-pulse bg-indigo-600 rounded-md p-2">
              <p className="text-white font-bold">Reporting...</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ReportLaptop;
