import React from "react";

const colorClasses = [
  {
    background: "bg-orange-100",
    text: "text-orange-600",
    bar: "bg-orange-400",
  },
  {
    background: "bg-green-100",
    text: "text-green-600",
    bar: "bg-green-400",
  },
  {
    background: "bg-blue-100",
    text: "text-blue-600",
    bar: "bg-blue-400",
  },
  {
    background: "bg-teal-100",
    text: "text-teal-600",
    bar: "bg-teal-400",
  },
];

export default function CountsGraph({
  colorIndex = 0, // Default index is 0 (orange)
  value = 50,
  total = 100,
  title = "Title of Count",
}) {
  // Ensure the colorIndex stays within bounds
  const color = colorClasses[colorIndex % colorClasses.length];
  const percentage = ((value / total) * 100).toFixed(1); // Calculate percentage

  return (
    <div
      className={`flex flex-col p-4 rounded-md shadow-md ${color.background} bg-opacity-50`}
    >
      {/* Title */}
      <h4
        className={`text-lg font-semibold mb-2 capitalize caption-top dark:text-white ${color.text}`}
      >
        {title}
      </h4>

      {/* Value Display */}
      <div
        className={`text-2xl font-bold ${color.text} dark:text-slate-900  mb-2`}
      >
        {value} / {total}
      </div>

      {/* Progress Bar */}
      <div className="mb-4 z-0">
        <div className="relative h-4 w-full rounded-2xl bg-gray-200 shadow-inner">
          <div
            className={`h-full rounded-2xl ${color.bar} flex justify-center items-center`}
            style={{ width: `${percentage}%` }}
          >
            <span className="text-white font-semibold text-xs">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
