import React from "react";
import { format } from "date-fns";
import { useAuthContext } from "../../../../Context";
import {
  Card,
  Col,
  Row,
  Typography,
} from "antd";

const { Text } = Typography;

export const Dashboard = () => {
    
  const { limitations } = useAuthContext();
  const formattedDate = format(new Date(limitations?.lastUpdate), "PPpp");

  const stats = [
    { title: "Total Tickets", value: 1500, bgColor: "bg-blue-500" },
    { title: "Vendors", value: 45, bgColor: "bg-green-500" },
    { title: "Customers", value: 1200, bgColor: "bg-yellow-500" },
    { title: "Events", value: 30, bgColor: "bg-purple-500" },
  ];

  return (
    <>
      <div className="flex items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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
          <Row gutter={[16, 16]}>
            {/* Vendor Limitation 1 */}
            <Col span={12}>
              <Card
                title="Vendor Ticket Adding Limitation"
                bordered
                hoverable
                className="shadow-lg"
              >
                <div className="flex flex-col gap-y-2 justify-between items-center">
                  <Text type="secondary">Last updated: {formattedDate}</Text>
                  <div>
                    <Text strong>{limitations?.vendorLimitation}</Text>
                    <span> Per {limitations?.type}</span>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Vendor Limitation 2 */}
            <Col span={12}>
              <Card
                title="Customer Ticket buying Limitation"
                bordered
                hoverable
                className="shadow-lg"
              >
                <div className="flex flex-col gap-y-2 justify-between items-center">
                  <Text type="secondary">Last updated: {formattedDate}</Text>
                  <div>
                    <Text strong>{limitations?.customerLimitation}</Text>
                    <span className="capitalize"> Per {limitations?.type}</span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
