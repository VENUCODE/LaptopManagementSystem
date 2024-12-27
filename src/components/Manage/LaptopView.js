import React from "react";
import ReactTimeago from "react-timeago";

const LaptopView = ({ laptop }) => {
  return (
    <div className="p-4 bg-transparent">
      <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-800">
        Laptop Details
      </h2>
      <p className="text-slate-700 dark:text-slate-500 mb-2">
        <strong>Brand:</strong> {laptop.brand || "Laptop Brand"}
      </p>
      <p className="text-slate-700 dark:text-slate-500 mb-2">
        <strong>Model:</strong> {laptop.model || "Model XYZ"}
      </p>
      <p className="text-slate-700 dark:text-slate-500 mb-2">
        <strong>Serial Number:</strong> {laptop.serialNumber}
      </p>
      <p className="text-slate-700 dark:text-slate-500 mb-2">
        <strong>Purchase Date:</strong>{" "}
        {new Date(laptop.purchaseDate).toLocaleDateString()}
      </p>
      <p className="text-slate-700 dark:text-slate-500 mb-2">
        <strong>Status:</strong>{" "}
        {laptop.status.charAt(0).toUpperCase() + laptop.status.slice(1)}
      </p>
      <p className="text-slate-700 dark:text-slate-500 mb-2">
        <strong>Added:</strong> <ReactTimeago date={laptop.createdAt} />
      </p>
      <p className="text-slate-700 dark:text-slate-500 mb-2">
        <strong>Updated :</strong> <ReactTimeago date={laptop.updatedAt} />
      </p>
    </div>
  );
};

export default LaptopView;
