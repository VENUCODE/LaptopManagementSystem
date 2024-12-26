import React, { useState } from "react";
import LaptopCard from "./LaptopCard"; // Make sure to import LaptopCard if it's in a separate file
import Filters from "./Filters";

const LaptopCardContainer = () => {
  const [laptop, setLaptop] = useState({
    name: "MacBook Pro 16-inch",
    brand: "Apple",
    model: "M2 Chip",
    serialNumber: "A12345XYZ6789",
    price: "2399.99",
    purchaseDate: "2023-11-15",
    description:
      "This is a high-performance laptop with the latest M2 chip and amazing display.",
  });
  const [laptops, setLaptops] = useState([laptop]);

  const [currentLaptops, setCurrentLaptops] = useState([laptop]);

  return (
    <div className="flex flex-col gap-4">
      <Filters laptops={laptops} setCurrentLaptops={setCurrentLaptops} />
      <div className="flex flex-row flex-wrap justify-evenly gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <LaptopCard key={i} laptop={laptop} />
        ))}
      </div>
    </div>
  );
};

export default LaptopCardContainer;
