// src/components/DashboardGraphs.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchDashboardData } from "../api";

const DashboardGraphs = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await fetchDashboardData();
      setData({
        labels: response.data.labels,
        datasets: [
          {
            label: "Student Enrollment",
            data: response.data.enrollmentCounts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    getData();
  }, []);

  return (
    <div>
      <h3>Dashboard Overview</h3>
      {data.labels && data.datasets ? (
        <Bar
          data={data}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Students",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Departments",
                },
              },
            },
          }}
          height={400}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DashboardGraphs;
