import React from "react";
import DoughnutChart from "./Charts/CustomDoughnut";
import CustomBarChart from "./Charts/CustomBar";

import CountsGraph from "./Charts/CountsGraph";
export default function Grid() {
  return (
    <div className="py-12 sm:py-16  container-fluid  custom-bg pattern-light dark:pattern-dark">
      <p className="text-4xl text-center heading-1">Inventory Overview</p>
      <p className="text-xl  text-center text-indigo-400 dark:text-indigo-50 font-semibold  mb-12 mt-4">
        Current inventory status
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4  ">
        <div className="lg:col-span-2 md:col-span-1 col-span-1 container-fluid lg:px-4 justify-center">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 h-full">
            <div>
              <CountsGraph colorIndex={3} title="Total" />
            </div>
            <div>
              <CountsGraph colorIndex={1} title="available" />
            </div>
            <div>
              <CountsGraph colorIndex={2} title="assigned" />
            </div>
            <div>
              <CountsGraph colorIndex={0} title="maintainance" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 md:col-span-1 col-span-1 container-fluid lg:px-4 justify-center mt-12">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 h-full">
            <div className="h-full w-full">
              <p className="text-indigo-500 dark:text-indigo-300 text-center font-semibold text-xl mb-3">
                Overview Piechart
              </p>
              <div className="lg:h-70 md:h-50 h-64 custom-card ">
                <DoughnutChart />
              </div>
            </div>
            <div className="md:w-full w-full">
              <p className="text-indigo-500 dark:text-indigo-300 text-center font-semibold text-xl mb-3">
                Barchart OverView
              </p>
              <div className="lg:h-70 md:h-50 h-64 custom-card">
                <CustomBarChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
