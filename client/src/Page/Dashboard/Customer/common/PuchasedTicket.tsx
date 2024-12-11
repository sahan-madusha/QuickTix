import { Card, Tag, Button, Divider } from "antd";
import React, { useEffect, useState } from "react";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { IMAGE_URL } from "../../../../Constant";
import { userPurchasedTicketsByUserId } from "../../../../Api";
import { useAuthContext } from "../../../../Context";
import { toast } from "react-toastify";

export const PurchasedTickets = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>([]);

  const { user } = useAuthContext();

  const fetchData = async () => {
    try {
      const res = await userPurchasedTicketsByUserId(user.userId);
      console.log(res);

      setSelectedEvent(res);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedEvent?.map((event, index) => (
          <Card
            key={index}
            className="shadow-lg transition-transform transform hover:scale-105"
            cover={
              <img
                alt={event.eventName}
                src={`${IMAGE_URL}/${event.eventImage}`}
                className="object-cover h-48 w-full"
              />
            }
          >
            <div className="p-3">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {event.eventName}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{event.eventDescription}</p>
              <Divider />
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Tag icon={<CalendarOutlined />} color="blue">
                    {event.eventDate}
                  </Tag>
                  <Tag icon={<ClockCircleOutlined />} color="green">
                    {event.eventTime}
                  </Tag>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex flex-wrap gap-2">
                    {event.tickets?.map((ticket: any, ticketIndex: number) => (
                      <Tag key={ticketIndex} icon={<DollarOutlined />} color="gold">
                        Rs:{ticket.ticketTotalAmount} - Qty: {ticket.ticketCount}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <EnvironmentOutlined className="mr-2 text-red-500" />
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  {event.eventLocation}
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
