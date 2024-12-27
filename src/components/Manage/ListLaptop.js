import React, { useState } from "react";
import LaptopCard from "./LaptopCard"; // Make sure to import LaptopCard if it's in a separate file
import Filters from "./Filters";
import { containerVariant } from "../../variants";
import { motion } from "framer-motion";
import { useLaptop } from "../../context/useLaptops";
const LaptopCardContainer = () => {
  const { laptops } = useLaptop();

  const [currentLaptops, setCurrentLaptops] = useState([laptops]);

  return (
    <div className="flex flex-col gap-4">
      <Filters laptops={laptops} setCurrentLaptops={setCurrentLaptops} />
      <div className="flex flex-row flex-wrap justify-evenly gap-3">
        {currentLaptops?.map((laptop, i) => (
          <LaptopCard index={i} key={i} laptop={laptop} />
        ))}
      </div>
    </div>
  );
};

export default LaptopCardContainer;
