import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../Context";
import { GetAppStats } from "../../../../Api";
import { ConfigUI } from "../../../../Components";

export const Dashboard = () => {
  const { limitations } = useAuthContext();
  const [statsList, setStatsList] = useState([
    { title: "QuickTix", value: 0, bgColor: "bg-blue-500" },
    { title: "Sold tickets", value: 0, bgColor: "bg-green-500" },
    { title: "Available tickets", value: 0, bgColor: "bg-yellow-500" },
    { title: "Events", value: 0, bgColor: "bg-purple-500" },
  ]);

  const fetchStatsData = async () => {
    const res = await GetAppStats();
    setStatsList([
      { title: "QuickTix", value: 0, bgColor: "bg-blue-500" },
      {
        title: "Sold tickets",
        value: res.totalVendors,
        bgColor: "bg-green-500",
      },
      {
        title: "Available tickets",
        value: res.totalCustomers,
        bgColor: "bg-yellow-500",
      },
      { title: "Events", value: res.totalEvents, bgColor: "bg-purple-500" },
    ]);
  };

  useEffect(() => {
    fetchStatsData();
  }, []);

  return (
    <>
      <div>
        <div className="flex items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {statsList.map((stat, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-md p-6 text-white ${stat.bgColor}`}
              >
                <h2 className="text-lg font-semibold">{stat.title}</h2>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="mx-1">
            <ConfigUI config={limitations} />
          </div>
        </div>
      </div>
    </>
  );
};
