import React from "react";
import Mylaptops from "./Mylaptops";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full mt-8 sm:mt-10">
      <h3 className="ff-m font-semibold ">Assigned laptops</h3>
      <Mylaptops />
    </div>
  );
};
export default Dashboard;
