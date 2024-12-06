import React, { useState } from "react";
import { Button } from "antd";
import { UserUiEnum } from "../../../Constant";
import { DashboardOutlined, InteractionOutlined } from "@ant-design/icons";

import { ExistingEvent } from "../../../Components";
import { AppConfig, Dashboard, SystemLogs } from "./common";
import { GetEventData } from "../../../Api";

export const AdminDashboard = () => {
  const [selectedNav, setSelectedNav] = useState(UserUiEnum.dashboard);
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
      <div className="flex flex-col md:flex-row gap-y-5 w-full">
        <div className="w-full md:w-1/12 overflow-x-scroll ">
          <div className="flex flex-row md:flex-col justify-between gap-y-5 mt-5 md:mt-0 mb-10 mx-5">
            <Button
              className={`border-1 mx-2 border-blue-500  p-12 ${
                selectedNav === UserUiEnum.dashboard
                  ? `bg-blue-950 text-white`
                  : `text-blue-500`
              } `}
              onClick={() => {
                setSelectedNav(UserUiEnum.dashboard);
              }}
            >
              <div>
                <div>
                  <DashboardOutlined className="text-lg" />
                </div>
                <span className="text-xs">Dashboard</span>
              </div>
            </Button>
            <Button
              className={`border-1 mx-2 border-blue-500  p-12 ${
                selectedNav === UserUiEnum.appconfig
                  ? `bg-blue-950 text-white`
                  : `text-blue-500`
              } `}
              onClick={() => {
                setSelectedNav(UserUiEnum.appconfig);
              }}
            >
              <div>
                <div>
                  <DashboardOutlined className="text-lg" />
                </div>
                <span className="text-xs">App config</span>
              </div>
            </Button>
            <Button
              className={`border-1 mx-2 border-blue-500  p-12 ${
                selectedNav === UserUiEnum.systemlogs
                  ? `bg-blue-950 text-white`
                  : `text-blue-500`
              } `}
              onClick={() => {
                setSelectedNav(UserUiEnum.systemlogs);
              }}
            >
              <div>
                <div>
                  <InteractionOutlined className="text-lg" />
                </div>
                <span className="text-xs">System logs</span>
              </div>
            </Button>
            <Button
              className={`border-1 mx-2 border-blue-500  p-12 ${
                selectedNav === UserUiEnum.addevent
                  ? `bg-blue-950 text-white`
                  : `text-blue-500`
              } `}
              onClick={() => {
                setSelectedNav(UserUiEnum.addevent);
              }}
            >
              <div>
                <div>
                  <InteractionOutlined className="text-lg" />
                </div>
                <span className="text-xs">Evenys</span>
              </div>
            </Button>
          </div>
        </div>
        <div className="w-full md:w-11/12">
          <div className="mx-1 md:mx-10">
            {selectedNav === UserUiEnum.dashboard && (
              <>
                <div className="flex container flex-row justify-center items-start w-full mt-10">
                  <Dashboard />
                </div>
              </>
            )}
            {selectedNav === UserUiEnum.appconfig && (
              <>
                <AppConfig />
              </>
            )}
            {selectedNav === UserUiEnum.systemlogs && (
              <>
                <SystemLogs />
              </>
            )}
            {selectedNav === UserUiEnum.addevent && (
              <>
                <ExistingEvent
                  isEventFetch={isEventFetch}
                  onEventClick={handleEventClick}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
