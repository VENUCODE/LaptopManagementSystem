import React from "react";

const colorClasses = [
  {
    background:
      "bg-red-100 hover:bg-red-300/60 dark:outline  dark:outline-2 shadow-md  hover:shadow-lg  hover:shadow-red-400 outline outline-2 outline-red-200 dark:outline-red-200/60 hover:dark:shadow-lg  hover:dark:shadow-red-400 hover:dark:bg-red-900/90 dark:bg-red-900/40",
    text: "text-red-600 dark:text-red-400",
    bar: "bg-red-400 dark:bg-red-700",
  },
  {
    background:
      "bg-green-100 hover:bg-green-300/60 dark:outline  dark:outline-2 shadow-md  hover:shadow-lg  hover:shadow-green-400 outline outline-2 outline-green-200 dark:outline-green-200/60 hover:dark:shadow-lg  hover:dark:shadow-green-400 hover:dark:bg-green-900/90 dark:bg-green-900/40",
    text: "text-green-600 dark:text-green-400",
    bar: "bg-green-400 dark:bg-green-700",
  },
  {
    background:
      "bg-blue-100 hover:bg-blue-300/60 dark:outline  dark:outline-2 shadow-md  hover:shadow-lg  hover:shadow-blue-400 outline outline-2 outline-blue-200 dark:outline-blue-200/60 hover:dark:shadow-lg  hover:dark:shadow-blue-400 hover:dark:bg-blue-900/90 dark:bg-blue-900/40",
    text: "text-blue-600 dark:text-blue-400",
    bar: "bg-blue-400 dark:bg-blue-700",
  },
  {
    background:
      "bg-teal-100 hover:bg-teal-300/60 dark:outline  dark:outline-2 shadow-md  hover:shadow-lg  hover:shadow-teal-400 outline outline-2 outline-teal-200 dark:outline-teal-200/60 hover:dark:shadow-lg  hover:dark:shadow-teal-400 hover:dark:bg-teal-900/90 dark:bg-teal-900/40",
    text: "text-teal-600 dark:text-teal-400",
    bar: "bg-teal-400 dark:bg-teal-700",
  },
];

export default function CountsGraph({
  colorIndex = 0,
  value = 50,
  total = 100,
  title = "Title of Count",
}) {
  const color = colorClasses[colorIndex % colorClasses.length];
  const percentage = ((value / total) * 100).toFixed(1);

  return (
    <div
      className={`flex flex-col p-4 rounded-md shadow-md ${color.background} bg-opacity-50`}
    >
      <h4
        className={`md:text-lg text-md font-semibold mb-2 capitalize caption-top  ${color.text}`}
      >
        {title}
      </h4>

      <div className={`text-xl md:text-2xl font-bold ${color.text}  mb-2`}>
        {value} / {total}
      </div>

      <div className="mb-4 z-0">
        <div className="relative h-4 w-full rounded-2xl bg-gray-200 shadow-inner">
          <div
            className={`h-full w-[0%] rounded-2xl ${color.bar} transition-all  flex justify-center items-center`}
            style={{ width: `${percentage}%` }}
          >
            <span className={` dark:text-white   font-semibold text-xs`}>
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
