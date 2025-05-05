"use client";

import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
} from "react-icons/fa";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement);

export default function Dashboard() {
  const [barData, setBarData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});

  useEffect(() => {
    setBarData({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "This Week",
          data: [1000, 2200, 1800, 2000, 2100, 2500, 1400],
          backgroundColor: "#000",
        },
        {
          label: "Last Week",
          data: [1200, 2000, 1700, 2300, 1800, 2400, 1600],
          backgroundColor: "#ccc",
        },
      ],
    });

    setDoughnutData({
      labels: ["Desktop", "Tablet", "Mobile"],
      datasets: [
        {
          data: [30000, 10000, 26400],
          backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        },
      ],
    });
  }, []);

  const stats = [
    {
      icon: <FaMoneyBillWave />,
      label: "Total Income",
      value: "$50,000",
      change: "+2.1%",
    },
    {
      icon: <FaMoneyBillWave />,
      label: "Gross Revenue",
      value: "$50,000",
      change: "-1.2%",
    },
    {
      icon: <FaShoppingCart />,
      label: "Total Orders",
      value: "13,000",
      change: "+3.3%",
    },
    {
      icon: <FaUsers />,
      label: "Total Customers",
      value: "40,000",
      change: "+2.4%",
    },
  ];

  const transactions = [
    {
      name: "Bernie Green",
      action: "bought a book",
      date: "Apr 23, 2025",
      amount: "$2300",
      status: "Completed",
    },
    {
      name: "Adebayo Adisa",
      action: "bought a book",
      date: "Apr 23, 2025",
      amount: "-$670",
      status: "Completed",
    },
    {
      name: "Olufemi Bayo",
      action: "returned a book",
      date: "Apr 18, 2025",
      amount: "$234",
      status: "Cancelled",
    },
    {
      name: "Nifemi Gbankle",
      action: "bought a book",
      date: "Apr 15, 2025",
      amount: "$5000",
      status: "In progress",
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-6">itan</h1>
        <nav className="space-y-4">
          <div>Overview</div>
          <div>Book Shelf</div>
          <div>Sales</div>
          <div className="text-red-500">Analytics</div>
          <div>Withdrawal</div>
          <div>Help</div>
          <div>Profile</div>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <div className="text-gray-500 flex items-center gap-2">
                {stat.icon} <span>{stat.label}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-green-500">
                {stat.change} vs last month
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="mb-2 text-lg font-semibold">Users Report</h2>
            <Bar data={barData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="mb-2 text-lg font-semibold">Reading Traffic</h2>
            <Doughnut data={doughnutData} />
            <div className="text-center mt-4 text-xl">66.4k Unique Readers</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="mb-4 text-lg font-semibold">Latest Transactions</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="pb-2">Transaction</th>
                <th className="pb-2">Date & Time</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2">
                    {tx.name} {tx.action}
                  </td>
                  <td className="py-2">{tx.date}</td>
                  <td className="py-2">{tx.amount}</td>
                  <td className="py-2 text-green-600">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
