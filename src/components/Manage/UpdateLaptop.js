import React, { useState, useEffect, useCallback } from "react";
import { FiMonitor, FiTag, FiHash, FiCalendar } from "react-icons/fi";
import { useLaptop } from "../../context/useLaptops";
import { message } from "antd";

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

const UpdateLaptop = ({ INITIAL, close }) => {
  const { updateLaptop } = useLaptop();
  const [loading, setLoading] = useState(false);
  const [laptop, setLaptop] = useState(INITIAL);

  const [initialState] = useState(INITIAL);
  const formatDate = useCallback((date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};

    inputFields.forEach((field) => {
      if (laptop[field.id] !== initialState[field.id]) {
        updatedFields[field.id] = laptop[field.id];
      }
    });
    console.log(updatedFields);

    if (Object.keys(updatedFields).length > 0) {
      await updateLaptop(INITIAL._id, updatedFields, setLoading);
    } else {
      message.error("No modifications made");
    }
    setLaptop(INITIAL);
    close();
  };

  useEffect(() => {
    setLaptop(INITIAL);
  }, [INITIAL]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-md bg-transparent">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        Update Laptop
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
                className="block text-gray-700  text-sm font-semibold mb-2"
              >
                {field.label}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 top-2.5 text-slate-500 ">
                  {field.icon}
                </span>

                <input
                  type={field.type}
                  id={field.id}
                  value={
                    field.type !== "date"
                      ? laptop[field.id]
                      : formatDate(laptop[field.id])
                  }
                  onChange={(e) =>
                    setLaptop({ ...laptop, [field.id]: e.target.value })
                  }
                  className="pl-10 shadow appearance-none text-sm  rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100  "
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
            {loading ? <>Updating....</> : <>Update Laptop</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLaptop;
