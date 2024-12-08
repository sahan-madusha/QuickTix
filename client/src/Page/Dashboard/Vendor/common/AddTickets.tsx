import React, { useEffect, useState } from "react";
import { ExistingEvent, TicketAddForm } from "../../../../Components";
import { GetEventData } from "../../../../Api";
import { useAuthContext } from "../../../../Context";

export const AddTickets = () => {
  const [isEventFetch, setIsEventFetch] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [selectedEventId, setSelectedEventId] = useState();
  const { tickets } = useAuthContext();

  const handleEventClick = async (event) => {
    try {
      const data = await GetEventData(event);
      setSelectedEvent(data);
      setSelectedEventId(event);
      setIsEventFetch(isEventFetch + 1);
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
    }
  };

  const fetchData = async () => {
    if (selectedEventId) {
      const data = await GetEventData(selectedEventId);
      setSelectedEvent(data);
      setIsEventFetch(isEventFetch + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedEventId, tickets]);

  return (
    <>
      <div className="flex justify-between">
        <div className="w-1/2 px-5">
          <TicketAddForm selectedEvent={selectedEvent} />
        </div>
        <div className="w-1/2">
          {" "}
          <ExistingEvent
            isEventFetch={isEventFetch}
            onEventClick={handleEventClick}
          />
        </div>
      </div>
    </>
  );
};
