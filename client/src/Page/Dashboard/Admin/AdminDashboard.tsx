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

  const handleVendorSubmit = () => {
    setVendorLimitations([
      ...vendorLimitations,
      {
        ...currentLimit,
      },
    ]);
    console.log("Vendor Limitation Saved:", currentLimit);
  };

  const handleCustomerSubmit = () => {
    setCustomerLimitations([
      ...customerLimitations,
      {
        ...currentLimit,
      },
    ]);
    console.log("Customer Limitation Saved:", currentLimit);
  };

  return (
    <div
      className="admin-panel-container"
    >
      <Tabs defaultActiveKey="1">
        {/* Vendor Limitation Management */}
        <TabPane tab="Manage Vendor Limitations" key="1">
          <Card
            title="Vendor Limitation Settings"
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

              {currentLimit.rangeType === "hour" && (
                <Form.Item label="Select Hour Range" required>
                  <RangePicker
                    format="HH:mm"
                    onChange={(value) =>
                      setCurrentLimit({
                        ...currentLimit,
                        timeRange: value
                          ? value.map((time) => dayjs(time).format("HH:mm"))
                          : [],
                      })
                    }
                  />
                </Form.Item>
              )}

              <Form.Item label="Maximum Tickets" required>
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

          <Divider>Existing Vendor Limitations</Divider>
          <Row gutter={[16, 16]}>
            {vendorLimitations.map((limitation, index) => (
              <Col span={8} key={index}>
                <Card title={`Limitation ${index + 1}`} bordered>
                  <p>Type: {limitation.rangeType}</p>
                  {limitation.rangeType === "hour" && (
                    <p>Time Range: {limitation.timeRange.join(" - ")}</p>
                  )}
                  <p>Max Tickets: {limitation.maxTickets}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        {/* Customer Limitation Management */}
        <TabPane tab="Manage Customer Limitations" key="2">
          <Card
            title="Customer Limitation Settings"
            style={{ marginBottom: "20px" }}
          >
            <Form layout="vertical" onFinish={handleCustomerSubmit}>
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

              {currentLimit.rangeType === "hour" && (
                <Form.Item label="Select Hour Range" required>
                  <RangePicker
                    format="HH:mm"
                    onChange={(value) =>
                      setCurrentLimit({
                        ...currentLimit,
                        timeRange: value
                          ? value.map((time) => dayjs(time).format("HH:mm"))
                          : [],
                      })
                    }
                  />
                </Form.Item>
              )}

              <Form.Item label="Maximum Tickets" required>
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
                  Save Customer Limitation
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Divider>Existing Customer Limitations</Divider>
          <Row gutter={[16, 16]}>
            {customerLimitations.map((limitation, index) => (
              <Col span={8} key={index}>
                <Card title={`Limitation ${index + 1}`} bordered>
                  <p>Type: {limitation.rangeType}</p>
                  {limitation.rangeType === "hour" && (
                    <p>Time Range: {limitation.timeRange.join(" - ")}</p>
                  )}
                  <p>Max Tickets: {limitation.maxTickets}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};
