import React, { useEffect, useState } from "react";
import { Card, List, Badge, Tooltip } from "antd";
import { useAuthContext } from "../../Context";
import { GetAllEvents, GetUsersEvents } from "../../Api";
import { IMAGE_URL, UserRolesEnum } from "../../Constant";
import { InfoCircleOutlined } from "@ant-design/icons";

interface ExistingEventProps {
  isEventFetch: any;
  onEventClick: (eventId: number) => void;
}

export const ExistingEvent: React.FC<ExistingEventProps> = ({
  isEventFetch,
  onEventClick,
}) => {
  const [events, setEvents] = useState([]);
  const { user } = useAuthContext();

  const fetchEvents = async () => {
    try {
      let data;
      if (user.userRole === UserRolesEnum.admin) {
        data = await GetAllEvents();
      } else {
        data = await GetUsersEvents(user.userId);
      }
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [isEventFetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        My Events 🎉
      </h2>
      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={events}
          renderItem={(event) => (
            <List.Item>
              <Badge.Ribbon
                text={event.status === 1 ? "Active" : "Inactive"}
                color={event.status === 1 ? "green" : "red"}
              >
                <Card
                  hoverable
                  onClick={() => onEventClick(event.id)}
                  className="transition-transform transform hover:scale-105 rounded-xl shadow-md overflow-hidden"
                  cover={
                    <img
                      alt={event.name}
                      src={`${IMAGE_URL}/${event.image}`}
                      className="h-16 w-full object-cover"
                    />
                  }
                >
                  <div className="flex justify-between gap-x-2 items-center">
                    <Tooltip title={event.name}>
                      <InfoCircleOutlined className="text-blue-500 text-lg" />
                    </Tooltip>
                    <Card.Meta className="truncate ms-2" title={event.name} />
                  </div>
                </Card>
              </Badge.Ribbon>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};
