import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Form,
  InputNumber,
  Select,
  Button,
  TimePicker,
  Divider,
  Tabs,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = TimePicker;
const { TabPane } = Tabs;

export const AdminDashboard = () => {
  const [vendorLimitations, setVendorLimitations] = useState<any[]>([]);
  const [customerLimitations, setCustomerLimitations] = useState<any[]>([]);
  const [currentLimit, setCurrentLimit] = useState({
    rangeType: "hour",
    maxTickets: null,
    timeRange: [],
  });

  const stats = [
    { title: "Total Tickets", value: 1500, bgColor: "bg-blue-500" },
    { title: "Vendors", value: 45, bgColor: "bg-green-500" },
    { title: "Customers", value: 1200, bgColor: "bg-yellow-500" },
    { title: "Events", value: 30, bgColor: "bg-purple-500" },
    { title: "Vendor ticket limit", value: 30, bgColor: "bg-red-500" },
    { title: "Customer ticket limit", value: 30, bgColor: "bg-pink-500" },
  ];

  const handleVendorSubmit = () => {
    setVendorLimitations([
      ...vendorLimitations,
      {
        ...currentLimit,
      },
    ]);
  };

  return (
    <div className="flex container flex-row justify-center items-start w-full mt-10">
      <Tabs defaultActiveKey="1" className="w-1/2">
        {/* Limitation Management */}
        <TabPane tab="Manage Vendor Limitations" key="1">
          <Card
            style={{ marginBottom: "20px" }}
          >
            <Form layout="vertical" onFinish={handleVendorSubmit}>
              <Form.Item label="Select Range Type" required>
                <Select
                  value={currentLimit.rangeType}
                  onChange={(value) =>
                    setCurrentLimit({ ...currentLimit, rangeType: value })
                  }
                >
                  <Option value="hour">Per Hour</Option>
                  <Option value="day">Per Day</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Maximum Tickets for vendors" required>
                <InputNumber
                  min={1}
                  value={currentLimit.maxTickets}
                  onChange={(value) =>
                    setCurrentLimit({ ...currentLimit, maxTickets: value })
                  }
                  placeholder="Enter maximum ticket count"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item label="Maximum Tickets for customers" required>
                <InputNumber
                  min={1}
                  value={currentLimit.maxTickets}
                  onChange={(value) =>
                    setCurrentLimit({ ...currentLimit, maxTickets: value })
                  }
                  placeholder="Enter maximum ticket count"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Save Vendor Limitation
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>

      <div className="w-1/2">
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
      </div>
    </div>
  );
};
