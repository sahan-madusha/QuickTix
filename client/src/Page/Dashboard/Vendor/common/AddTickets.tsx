import React, { useEffect, useState } from "react";
import { ExistingEvent } from "./ExistingEvent";
import { GetEventData } from "../../../../Api";

export const AddTickets = () => {
  const [isEventFetch, setIsEventFetch] = useState(1);

  const handleEventClick = async (event) => {
    try {
      const data = await GetEventData(event);
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
    }
  };

  return (
    <>
      <div className="flex">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
        totam dolorum illum libero cumque adipisci tenetur quam nihil doloremque
        minus sit, voluptatum possimus ut officiis, ullam non sunt officia
        nobis!
        <ExistingEvent
          isEventFetch={isEventFetch}
          onEventClick={handleEventClick}
        />
      </div>
    </>
  );
};
