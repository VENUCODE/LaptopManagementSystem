import React from "react";

const Loader = ({ className = "h-4 w-full rounded-md" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${className}`}
    ></div>
  );
};

export const TableLoader = () => {
  const rows = Array(8).fill(0);
  return (
    <div className="mt-10 px-4 sm:px-0 container w-full h-full">
      <div className="w-full flex flex-row justify-between gap-2 ">
        <Loader className="w-1/2 h-[40px]  rounded-sm my-2" />
        <Loader className="w-1/5 h-[40px] rounded-sm my-2" />
        <Loader className="w-1/5 h-[40px] rounded-sm my-2" />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {[1, 2, 3].map((i) => {
              <th scope="col" className="px-6 py-3">
                <Loader className="h-4 w-20" />
              </th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Loader className="h-4 w-20" />
              </td>
              <td className="px-6 py-4">
                <Loader className="h-4 w-20" />
              </td>
              <td className="px-6 py-4">
                <Loader className="h-4 w-20" />
              </td>
              <td className="px-6 py-4">
                <Loader className="h-4 w-20" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Loader;
