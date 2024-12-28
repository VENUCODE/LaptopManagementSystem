import React, { useState } from "react";
import { MdComputer } from "react-icons/md";
const Request = () => {
  const [laptop, setLaptop] = useState({ description: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Laptop requested successfully!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-md bg-transparent">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <MdComputer className="text-blue-500 text-3xl" /> Request New Laptop
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <label
              htmlFor="description"
              className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
            >
              Description
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 top-2.5 text-slate-500 dark:text-blue-400">
                <MdComputer />
              </span>
              <textarea
                required
                id="description"
                value={laptop.description}
                onChange={(e) =>
                  setLaptop({ ...laptop, description: e.target.value })
                }
                className="pl-10 shadow appearance-none text-sm rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100 dark:bg-slate-600 dark:bg-opacity-50"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500/80 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:ring-2 flex items-center gap-2"
          >
            {loading ? <>Requesting....</> : <>Request Laptop</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Request;
