"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { FaBook, FaUsers, FaUserTie, FaMoneyBillWave } from "react-icons/fa";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

ChartJS.register(ArcElement);

export default function Dashboard() {
  const [areaData, setAreaData] = useState({
    series: [],
    options: {},
  });

  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setAreaData({
      series: [
        {
          name: "Transactions",
          data: [
            12000000, 18000000, 15000000, 21000000, 19500000, 20500000,
            23000000,
          ],
        },
      ],
      options: {
        chart: {
          type: "area",
          height: 350,
          toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100],
          },
        },
        colors: ["#EF4444"],
      },
    });

    setDoughnutData({
      labels: ["Pending", "Approved"],
      datasets: [
        {
          data: [213, 4457],
          backgroundColor: ["#F59E0B", "#10B981"],
        },
      ],
    });
  }, []);

  const Dougnut = () => {
     return (<div className="bg-white p-4 rounded shadow">
            <h2 className="mb-2 text-lg font-semibold">Approved Payments</h2>
            {doughnutData?.datasets && <Doughnut data={doughnutData} />}
            <div className="text-center mt-4 text-xl">
              1289 Approved Payments
            </div>
          </div>
          )}

  const stats = [
    {
      icon: <FaBook />,
      label: "Books",
      value: "1289",
      change: "-5.5%",
      color: "text-red-500",
    },
    {
      icon: <FaUsers />,
      label: "Readers",
      value: "3458",
      change: "+8.5%",
      color: "text-green-500",
    },
    {
      icon: <FaUserTie />,
      label: "Authors",
      value: "1069",
      change: "-2.5%",
      color: "text-red-500",
    },
    {
      icon: <Dougnut />,
      label: "Approved Payments",
      value: "1289",
      change: "",
      color: "text-green-500",
    },
  ];

  const booksBought = [
    { name: "Fate", amount: "$50", date: "07 Mar 2025 12:35PM" },
    { name: "Psychology of Money", amount: "$30", date: "08 Mar 2025 10:30PM" },
  ];

  const notifications = [
    {
      type: "Reader Notification",
      text: "Tony Tetuila just bought a psychology of money at 12:34pm...",
    },
    {
      type: "User Notification",
      text: "Matthew Paul just onboarded on Itan Book app at 10:30pm...",
    },
    {
      type: "Author Notification",
      text: "Clifford Green just published a book, waiting to be reviewed...",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <div className="text-gray-500 flex items-center gap-2">
                {stat.icon} <span>{stat.label}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <div className={`text-sm ${stat.color}`}>
                  {stat.change} since last month
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="mb-2 text-lg font-semibold">
              Transaction Analytics
            </h2>
            {areaData.series.length > 0 && (
              <ApexChart
                options={areaData.options}
                series={areaData.series}
                type="area"
                height={300}
              />
            )}
          </div>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="mb-4 text-lg font-semibold">Books Bought</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="pb-2">Book Name</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {booksBought.map((book, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2">{book.name}</td>
                    <td className="py-2">{book.amount}</td>
                    <td className="py-2">{book.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="mb-4 text-lg font-semibold">Notifications</h2>
            <ul className="space-y-3">
              {notifications.map((note, idx) => (
                <li key={idx} className="border p-3 rounded hover:shadow">
                  <strong>{note.type}</strong>
                  <p className="text-sm text-gray-600">{note.text}</p>
                  <button className="text-blue-500 text-sm mt-1">
                    Read More
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
