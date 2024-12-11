import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../Context";
import { GetAppStats } from "../../../../Api";
import { Charts, ConfigUI } from "../../../../Components";

export const Dashboard = () => {
  const { limitations, tickets, isEventUpdated } = useAuthContext();
  const [statsList, setStatsList] = useState([
    { title: "QuickTix", value: 0, bgColor: "bg-blue-500" },
    { title: "Vendors", value: 0, bgColor: "bg-green-500" },
    { title: "Customers", value: 0, bgColor: "bg-yellow-500" },
    { title: "Events", value: 0, bgColor: "bg-purple-500" },
  ]);
  const [ticketStatus, setTicketStatus] = useState([
    { name: "Sold", value: 0 },
    { name: "Available", value: 0 },
  ]);
  const [events , setEvents] = useState([]);

  const fetchStatsData = async () => {
    const res = await GetAppStats();
    setStatsList([
      {
        title: "QuickTix",
        value: res?.totalOfAvailableTickets,
        bgColor: "bg-blue-500",
      },
      { title: "Vendors", value: res.totalVendors, bgColor: "bg-green-500" },
      {
        title: "Customers",
        value: res.totalCustomers,
        bgColor: "bg-yellow-500",
      },
      { title: "Events", value: res.totalEvents, bgColor: "bg-purple-500" },
    ]);

    setTicketStatus([
      { name: "Sold", value: res?.totalPurchasedTickets },
      { name: "Available", value: res?.totalOfAvailableTickets },
    ]);

    setEvents(res?.eventTicketDetails)

  };


  useEffect(() => {
    fetchStatsData();
  }, [tickets, isEventUpdated]);

  return (
    <>
      <div>
        <div className="flex items-start">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
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
            <div className=" w-[50vw] mt-3 h-[45vh] overflow-scroll">
              <Charts ticketStatus={ticketStatus} events={events} />
            </div>
          </div>
          <div className="mx-1">
            <ConfigUI config={limitations} />
          </div>
        </div>
      </div>
    </>
  );
};
