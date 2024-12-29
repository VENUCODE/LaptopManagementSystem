import React from "react";

import { motion } from "framer-motion";
import { cardVariant } from "../../variants";
const colorClasses = [
  {
    background:
      "bg-red-100 hover:bg-red-300/60 shadow-xl shadow-md  hover:shadow-lg  hover:shadow-red-400  hover:dark:shadow-xl  hover:dark:shadow-red-400/40 hover:dark:bg-red-900/90 dark:bg-red-900/40",
    text: "text-red-600 dark:text-red-400",
    bar: "bg-red-400 dark:bg-red-700",
  },
  {
    background:
      "bg-green-100 hover:bg-green-300/60 shadow-xl shadow-md  hover:shadow-lg  hover:shadow-green-400  hover:dark:shadow-xl  hover:dark:shadow-green-400/40 hover:dark:bg-green-900/90 dark:bg-green-900/40",
    text: "text-green-600 dark:text-green-400",
    bar: "bg-green-400 dark:bg-green-700",
  },
  {
    background:
      "bg-blue-100 hover:bg-blue-300/60 shadow-xl shadow-md  hover:shadow-lg  hover:shadow-blue-400  hover:dark:shadow-xl  hover:dark:shadow-blue-400/40 hover:dark:bg-blue-900/90 dark:bg-blue-900/40",
    text: "text-blue-600 dark:text-blue-400",
    bar: "bg-blue-400 dark:bg-blue-700",
  },
  {
    background:
      "bg-teal-100 hover:bg-teal-300/60 shadow-xl shadow-md  hover:shadow-lg  hover:shadow-teal-400  hover:dark:shadow-xl  hover:dark:shadow-teal-400/40 hover:dark:bg-teal-900/90 dark:bg-teal-900/40",
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
  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0,
        y: 100,
        transition: {
          duration: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.1,
        },
      }}
      className={`flex flex-col p-4 rounded-md shadow-md ${color.background} bg-opacity-50`}
    >
      <h4
        className={`md:text-lg text-md font-semibold mb-2 capitalize caption-top  ${color.text}`}
      >
        {title}
      </h4>

      <div className={`text-xl md:text-2xl font-extrabold ${color.text}  mb-2`}>
        {colorIndex === 3 ? total : `${value} / ${total}`}
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
    </motion.div>
  );
}
