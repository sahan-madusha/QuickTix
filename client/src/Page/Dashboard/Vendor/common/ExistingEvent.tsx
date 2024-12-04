import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import { IMAGE_URL } from "../../../../Constant";
import { GetUsersEvents } from "../../../../Api";
import { useAuthContext } from "../../../../Context";

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
      const data = await GetUsersEvents(user.userId);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [isEventFetch]);

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <List
        grid={{ gutter: 6, column: 3 }}
        dataSource={events}
        renderItem={(event) => (
          <List.Item onClick={() => onEventClick(event.id)}>
            <Card
              className={`${
                event.status === 1 ? "bg-green-200" : "bg-red-200"
              }`}
              cover={
                <img
                  alt={event.name}
                  src={`${IMAGE_URL}/${event.image}`}
                  className="h-28 w-24 object-cover"
                />
              }
              hoverable
            >
              <Card.Meta title={event.name} />
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};
