import React, { useState } from "react";
import { Button, Card, Col, Form, InputNumber, Row, Select } from "antd";
import { toast } from "react-toastify";
import { updateConfigData } from "../../../../Api";
import { useAuthContext } from "../../../../Context";
import { ConfigUI } from "../../../../Components";

const { Option } = Select;

export const AppConfig = () => {
  const { limitations } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleVendorSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await updateConfigData(data);
      toast.success(response?.message);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg">
      <Row gutter={24} className="flex justify-between">
        {/* Form Section */}
        <Col xs={24} md={12}>
          <Card title="Set Ticket Limitations" bordered hoverable>
            <Form
              layout="vertical"
              onFinish={handleVendorSubmit}
              initialValues={{
                customerLimitation: limitations?.customerLimitation,
                maximumTicketCountEvent: limitations?.maximumTicketCountEvent,
                status: limitations?.status,
                totalTicketCount: limitations?.totalTicketCount,
                vendorLimitation: limitations?.vendorLimitation,
              }}
            >
              <Form.Item
                label="System status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please select limitation type",
                  },
                ]}
              >
                <Select placeholder="System status">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Maximum number of tickets that can be added to an event for a vendor"
                name="vendorLimitation"
                rules={[
                  {
                    required: true,
                    message: "Please enter Maximum number of tickets that can be added to an event for a vendor",
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
                label="Maximum number of tickets that can be purchased to an event for a customer"
                name="customerLimitation"
                rules={[
                  {
                    required: true,
                    message: "Please enter Maximum number of tickets that can be purchased to an event for a customer",
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
                label="Maximum Tickets count for Event"
                name="maximumTicketCountEvent"
                rules={[
                  {
                    required: true,
                    message: "Maximum Tickets count for Event",
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
                label="Maximum Tickets count for system"
                name="totalTicketCount"
                rules={[
                  {
                    required: true,
                    message: "Maximum Tickets count for system",
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
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  Save Limitations
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Limitation Details Section */}
        <ConfigUI config={limitations} />
      </Row>
    </div>
  );
};
