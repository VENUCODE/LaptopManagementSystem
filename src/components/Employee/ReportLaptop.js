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
      >
        <p>Brand: {brand}</p>
        <p>Model: {model}</p>
        <p>Serial Number: {serialNumber}</p>

        <Input.TextArea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        <Radio.Group
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <Radio value="low">Low</Radio>
          <Radio value="medium">Medium</Radio>
          <Radio value="high">High</Radio>
        </Radio.Group>
        {loadingReportLaptop && (
          <div className="text-center mt-4 animate-pulse bg-indigo-600 rounded-md">
            <p className="text-white font-bold">Reporting...</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ReportLaptop;
