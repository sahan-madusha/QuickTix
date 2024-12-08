import {TicketAddForm} from "../../Components";
import { GetEventData } from "../../Api";
import { ExistingEvent } from "../../Components";
import React, { useState } from "react";

export const BookTicket = () => {
  const [isEventFetch, setIsEventFetch] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<any>();

  const handleEventClick = async (event) => {
    try {
      const data = await GetEventData(event);
      setSelectedEvent(data);
      setIsEventFetch(isEventFetch + 1);
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="w-1/2 px-5">
          <TicketAddForm selectedEvent = {selectedEvent}/>
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
