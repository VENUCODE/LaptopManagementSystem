import React, { useState } from "react";
import { FiMonitor, FiTag, FiHash, FiCalendar } from "react-icons/fi";
import { MdComputer } from "react-icons/md";
import { useLaptop } from "../../context/useLaptops";

const inputFields = [
  {
    id: "brand",
    placholder: "Enter brand",
    label: "Laptop Brand",
    type: "text",
    icon: <FiTag />,
  },
  {
    id: "model",
    placholder: "Enter model",
    label: "Laptop Model",
    type: "text",
    icon: <FiMonitor />,
  },
  {
    id: "serialNumber",
    placholder: "Enter serialNumber",
    label: "Laptop Serial Number",
    type: "text",
    icon: <FiHash />,
  },
  {
    id: "purchaseDate",
    placholder: "Enter purchaseDate",
    label: "Laptop Purchase Date",
    type: "date",
    icon: <FiCalendar />,
  },
];

const INITIAL_FORM = {
  brand: "",
  model: "",
  serialNumber: "",
  purchaseDate: "",
};
const AddLaptop = () => {
  const { addLaptop } = useLaptop();
  const [loading, setLoading] = useState(false);
  const [laptop, setLaptop] = useState(INITIAL_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    addLaptop(laptop, setLoading);
    setLaptop(INITIAL_FORM);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-md bg-transparent">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <MdComputer className="text-blue-500 text-3xl" /> Add Laptop
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => (
            <div
              key={field.id}
              className={`relative ${
                field.type === "textarea" ? "md:col-span-2" : ""
              }`}
            >
              <label
                htmlFor={field.id}
                className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
              >
                {field.label}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 top-2.5 text-slate-500 dark:text-blue-400">
                  {field.icon}
                </span>

                <input
                  type={field.type}
                  required
                  id={field.id}
                  value={laptop[field.id]}
                  onChange={(e) =>
                    setLaptop({ ...laptop, [field.id]: e.target.value })
                  }
                  className="pl-10 shadow appearance-none text-sm  rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100 dark:bg-slate-600 dark:bg-opacity-50"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500/80  hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:ring-2  flex items-center gap-2"
          >
            {loading ? <>Adding....</> : <>Add Laptop</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLaptop;
