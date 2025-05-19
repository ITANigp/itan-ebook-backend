"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookReader,
  faUserEdit,
  faMoneyBillWave,
  faBell,
  faUserCircle,
  faSort,
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

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
          data: [87, 344],
          backgroundColor: ["#FF3C00", "#00C851"],
        },
      ],
    });
  }, []);

  const Dougnut = () => {
    return (
      <div className="w-20 h-24">
        {doughnutData?.datasets && <Doughnut data={doughnutData} />}
      </div>
    );
  };

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
      <main className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-2 shadow-md w-56">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-md font-semibold text-gray-700 mb-6 ml-2">
                  Books
                </h2>
                <h3 className="text-3xl font-bold text-black">1589</h3>
              </div>
              <div className="bg-purple-100 p-[20px] py-[17px] rounded-full">
                <FontAwesomeIcon
                  icon={faBook}
                  className="text-purple-500 text-[30px]"
                />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-red-500">
              <FontAwesomeIcon icon={faArrowTrendDown} className="mr-1" />
              <span className="font-medium">-5.5%</span>
              <span className="text-gray-500 ml-1">since last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-2 shadow-md w-56">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-md font-semibold text-gray-700 mb-6 ml-2">
                  Readers
                </h2>
                <h3 className="text-3xl font-bold text-black">9,458</h3>
              </div>
              <div className="bg-green-100 p-[20px] rounded-full">
                <FontAwesomeIcon
                  icon={faBookReader}
                  className="text-green-500 text-[30px]"
                />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="mr-1 text-green-500"
              />
              <span className="font-medium text-green-500">+6.5%</span>
              <span className="ml-1">since last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-2 shadow-md w-56">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-md font-semibold text-gray-700 mb-6 ml-2">
                  Authors
                </h2>
                <h3 className="text-3xl font-bold text-black">2,946</h3>
              </div>
              <div className="bg-teal-100 p-[20px] px-[17px] rounded-full">
                <FontAwesomeIcon
                  icon={faUserEdit}
                  className="text-teal-500 text-[30px]"
                />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-red-500">
              <FontAwesomeIcon icon={faArrowTrendDown} className="mr-1" />
              <span className="font-medium">-5.5%</span>
              <span className="text-gray-500 ml-1">since last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-2 shadow-md w-56">
            <div className="flex justify-between items-center mb-4">
              <div>
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  className="text-green-500 text-[30px]"
                />
                <h3 className="text-xl font-bold text-black mt-2">1,289</h3>
                <h2 className="text-xs font-semibold text-gray-700 mb-1 mt-9">
                  Approved Payments
                </h2>
              </div>
              <Dougnut />
            </div>
          </div>
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
