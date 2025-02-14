import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsScreen = () => {
    const [filter, setFilter] = useState("monthly"); 

    const earningsData = {
      monthly: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
          {
            label: "Monthly Earnings ($)",
            data: [5000, 7000, 8000, 9000, 11000, 12500, 14000, 15500, 17000, 18500, 20000, 22000],
            backgroundColor: "#4dabf7",
            borderRadius: 5,
          },
        ],
      },
      yearly: {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [
          {
            label: "Yearly Earnings ($)",
            data: [80000, 90000, 110000, 130000, 150000],
            backgroundColor: "#ff9800",
            borderRadius: 5,
          },
        ],
      },
    };
  

  const adCategoryData = {
    labels: ["Walls", "Rickshaws", "Helmets"],
    datasets: [
      {
        data: [55, 45], 
        backgroundColor: ["#4dabf7", "#dcdcdc"],
        borderWidth: 4,
        cutout: "70%",  
      },
      {
        data: [35, 65], 
        backgroundColor: ["#4caf50", "#dcdcdc"],
        borderWidth: 4,
        cutout: "45%",
      },
      {
        data: [10, 90], 
        backgroundColor: ["#e74c3c", "#dcdcdc"],
        borderWidth: 4,
        cutout: "30%",
      },
    ],
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
    <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
      Track key metrics and platform performance with real-time insights.
    </h2>

    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={titleStyle}>📊 Earnings</h3>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div style={{ height: "300px" }}>
          <Bar data={earningsData[filter]} options={{ responsive: true }} />
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={titleStyle}>📢 Ad Category Distribution</h3>
        <Doughnut data={adCategoryData} options={{ responsive: true }} />
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <LegendItem color="#4dabf7" text="55% Walls" />
          <LegendItem color="#4caf50" text="35% Rickshaws" />
          <LegendItem color="#e74c3c" text="10% Helmets" />
        </div>
      </div>
    </div>
  </div>
  );
};

const LegendItem = ({ color, text }) => (
  <div style={{ display: "flex", alignItems: "center", margin: "0 10px" }}>
    <div style={{ width: "12px", height: "12px", backgroundColor: color, marginRight: "5px", borderRadius: "50%" }}></div>
    <span>{text}</span>
  </div>
);

// Styles
const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "400px",
    textAlign: "center",
  };
  
  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
  };
  
  const selectStyle = {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
  };

export default AnalyticsScreen;
