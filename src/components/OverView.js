import React from "react";
import DoughnutChart from "./Charts/CustomDoughnut";
import CustomBarChart from "./Charts/CustomBar";
import CountBars from "./Charts/CountsGraph";
import CountsGraph from "./Charts/CountsGraph";

export default function Grid() {
  return (
    <div className="py-12 sm:py-16  container-fluid  custom-bg pattern-light dark:pattern-dark">
      <p className="text-xl text-center text-indigo-400 dark:text-indigo-50 font-semibold">
        Inventory overview
      </p>
      <p className="heading-1 mb-12">Current Inventory Status</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4  ">
        <div className="lg:col-span-2 md:col-span-1 col-span-1">
          <div className="flex flex-wrap justify-center lg:flex-nowrap">
            <div className="lg:w-1/2 md:w-full w-full p-4">
              <p className="text-indigo-500 text-center">title</p>
              <div className="lg:h-70 md:h-50 h-64 custom-card ">
                <DoughnutChart />
              </div>
            </div>
            <div className="lg:w-1/2 md:w-full w-full p-4">
              <p className="text-indigo-500 text-center">title</p>
              <div className="lg:h-70 md:h-50 h-64 custom-card">
                <CustomBarChart />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 md:col-span-1 col-span-1">
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full">
            <div>
              <CountsGraph colorIndex={0} />
            </div>
            <div>
              <CountsGraph colorIndex={1} />
            </div>
            <div>
              <CountsGraph colorIndex={2} />
            </div>
            <div>
              <CountsGraph colorIndex={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
