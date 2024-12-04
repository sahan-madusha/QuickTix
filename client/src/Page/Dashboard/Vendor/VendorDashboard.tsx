import { Button } from "antd";
import React, { useState } from "react";
import { AppstoreAddOutlined, DashboardOutlined } from "@ant-design/icons";
import { UserUiEnum } from "../../../Constant";
import { AddEvent, AddTickets, Dashboard } from "./common";

export const VendorDashboard = () => {
  const [selectedNav, setSelectedNav] = useState(UserUiEnum.dashboard);

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
                  <AppstoreAddOutlined className="text-lg" />
                </div>
                <span className="text-xs">Event manage</span>
              </div>
            </Button>
            <Button
              className={`border-1 mx-2 border-blue-500  p-12 ${
                selectedNav === UserUiEnum.addticket
                  ? `bg-blue-950 text-white`
                  : `text-blue-500`
              } `}
              onClick={() => {
                setSelectedNav(UserUiEnum.addticket);
              }}
            >
              <div>
                <div>
                  <DashboardOutlined className="text-lg" />
                </div>
                <span className="text-xs">Ticket manage</span>
              </div>
            </Button>
          </div>
        </div>
        <div className="w-full md:w-11/12">
          <div className="mx-1 md:mx-10">
            {selectedNav === UserUiEnum.dashboard && (
              <>
                <Dashboard />
              </>
            )}
            {selectedNav === UserUiEnum.addevent && (
              <>
                <AddEvent />
              </>
            )}
            {selectedNav === UserUiEnum.addticket && (
              <>
                <AddTickets />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
