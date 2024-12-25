import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Register the plugin

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],

      backgroundColor: [
        "rgba(255, 99, 132, 0.9)",
        "rgba(54, 162, 235, 0.9)",
        "rgba(255, 206, 86, 0.9)",
        "rgba(75, 192, 192, 0.9)",
        "rgba(153, 102, 255, 0.9)",
        "rgba(255, 159, 64, 0.9)",
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
      hoverOffset: 20,
    },
  ],
};

export const options = {
  responsive: true,
  circumference: 180,
  rotation: -90,
  spacing: 10,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: {
          size: 14,
        },
        color: "rgba(54, 162, 235, 1)",
      },
    },
    datalabels: {
      color: "white",
      font: {
        weight: "semibold",
        size: 14,
      },
      formatter: (value) => `${value}`,
    },
    tooltip: {
      enabled: true,
      displayColors: false,
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.formattedValue}`;
        },
      },
    },
  },
};

export default function DoughnutChart() {
  return <Doughnut data={data} options={options} />;
}
