import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const customBarData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], // This defines the x-axis labels
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
      borderRadius: 10,
    },
  ],
};

export default function CustomBarChart() {
  return (
    <Bar
      data={customBarData}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
            position: "bottom",
          },
          datalabels: {
            color: "white",
            font: {
              weight: "semibold",
              size: 14,
            },
            formatter: (value) => `${value}`,
          },
        },
      }}
    />
  );
}