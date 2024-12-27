import React from "react";
import AssignLaptop from ".";
import { useEmployee } from "../../context/useEmployee";
import EmployeeAssign from "./EmployeeAssign";
import { Divider, Skeleton, Spin } from "antd";
import ReactTimeago from "react-timeago";

const DetailEmployee = ({ data, setData }) => {
  const { unassignLaptop, modal } = useEmployee();
  if (!data) {
    return (
      <div className="text-center text-gray-500">
        No employee data available.
        <Skeleton active loading={true} />
      </div>
    );
  }
  const handleUnassign = async (assignid) => {
    await unassignLaptop(assignid);
    setData(null);
  };

  const { name, email, department, role } = data.employee;

  return (
    <div className="bg-transparent m-0 p-0">
      <div className="p-6 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Employee Details
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">Name:</span>
            <span className="text-gray-900 capitalize">{name || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-900">{email || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600 font-medium">Department:</span>
            <span className="text-gray-900">{department || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium capitalize">Role:</span>
            <span className="text-gray-900">{role || "N/A"}</span>
          </div>
          {data.laptops && data.laptops.length > 0 ? (
            <>
              <Divider orientationMargin={0} orientation="left">
                Assigned Laptops
              </Divider>
              {data.laptops.map((laptop, index) => (
                <div
                  key={index}
                  className="flex flex-col outline outline-2 outline-amber-500/60 p-2 border-b pb-2 rounded-md shadow-sm"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Brand & model
                    </span>
                    <span className="text-gray-900 font-bold">
                      {laptop.laptopDetails.brand}-{laptop.laptopDetails.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Laptop Serial Number:
                    </span>
                    <span className="text-gray-900 font-bold">
                      {laptop.laptopDetails.serialNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Assigned on:
                    </span>
                    <span className="text-gray-900 font-bold">
                      {new Date(laptop.assignedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs  ">
                      <ReactTimeago date={new Date(laptop.assignedAt)} />
                    </span>
                  </div>
                  <button
                    onClick={() => handleUnassign(laptop.assignmentId)}
                    className="bg-red-400/20 hover:bg-red-400 hover:text-white  w-auto mt-2 p-1 rounded text-red-500"
                  >
                    Unassign
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center text-gray-500">No laptops assigned</div>
          )}
          <EmployeeAssign empid={data.employee._id} />
        </div>
      </div>
    </div>
  );
};

export default DetailEmployee;
