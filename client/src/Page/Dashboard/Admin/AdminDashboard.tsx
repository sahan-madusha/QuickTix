import React from "react";
import {
  Card,
  Col,
  Row,
  Form,
  InputNumber,
  Select,
  Button,
  Tabs,
  Typography,
} from "antd";
import { useAuthContext } from "../../../Context";
import { format } from "date-fns";
import { updateConfigData } from "../../../Api";
import { toast } from "react-toastify";

const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

export const AdminDashboard = () => {
  const { limitations } = useAuthContext();

  const formattedDate = format(new Date(limitations?.lastUpdate), "PPpp");

  const stats = [
    { title: "Total Tickets", value: 1500, bgColor: "bg-blue-500" },
    { title: "Vendors", value: 45, bgColor: "bg-green-500" },
    { title: "Customers", value: 1200, bgColor: "bg-yellow-500" },
    { title: "Events", value: 30, bgColor: "bg-purple-500" },
  ];

  const handleVendorSubmit = async(data) => {
    try {
      const response = await updateConfigData(data);
      toast.success(response?.message)
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  };

  return (
    <div className="flex container flex-row justify-center items-start w-full mt-10">
      <Tabs defaultActiveKey="1" className="w-1/2">
        {/* Limitation Management */}
        <TabPane tab="Manage Limitations" key="1">
          <Card style={{ marginBottom: "20px" }}>
            <Form layout="vertical" onFinish={handleVendorSubmit}>
              <Form.Item
                label="Select Range Type"
                name="rangeType"
                rules={[
                  { required: true, message: "Please Select limitation type" },
                ]}
              >
                <Select placeholder="Select a range type">
                  <Option value="hour">Per Hour</Option>
                  <Option value="day">Per Day</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Maximum Tickets for vendors"
                name="vendorLimitation"
                rules={[
                  {
                    required: true,
                    message: "Please enter maximum Tickets for vendors",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  placeholder="Enter maximum ticket count"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Maximum Tickets for customers"
                name="customerLimitation"
                rules={[
                  {
                    required: true,
                    message: "Please enter maximum Tickets for customers",
                  },
                ]}
              >
                <InputNumber
                  min={1}
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
        <div className="mt-10 mx-1">
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
    </div>
  );
};
