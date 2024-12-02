import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { updateConfigData } from "../../../../Api";
import { useAuthContext } from "../../../../Context";

const { Option } = Select;
const { Text, Title } = Typography;

export const AppConfig = () => {
  const { limitations } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const formattedDate = format(new Date(limitations?.lastUpdate), "PPpp");

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

      <Row gutter={24}>
        {/* Form Section */}
        <Col xs={24} md={12}>
          <Card title="Set Ticket Limitations" bordered hoverable>
            <Form layout="vertical" onFinish={handleVendorSubmit}>
              <Form.Item
                label="Select Range Type"
                name="rangeType"
                rules={[
                  {
                    required: true,
                    message: "Please select limitation type",
                  },
                ]}
              >
                <Select placeholder="Select a range type">
                  <Option value="hour">Per Hour</Option>
                  <Option value="day">Per Day</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Maximum Tickets for Vendors"
                name="vendorLimitation"
                rules={[
                  {
                    required: true,
                    message: "Please enter maximum tickets for vendors",
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
                label="Maximum Tickets for Customers"
                name="customerLimitation"
                rules={[
                  {
                    required: true,
                    message: "Please enter maximum tickets for customers",
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
        <Col xs={24} md={12}>
          <Card
            title="Vendor Ticket Adding Limitation"
            bordered
            hoverable
            className="mb-4"
          >
            <Spin spinning={loading}>
              <Text type="secondary">Last updated: {formattedDate}</Text>
              <div className="mt-2">
                <Text strong>{limitations?.vendorLimitation}</Text>
                <span> Per {limitations?.type}</span>
              </div>
            </Spin>
          </Card>

          <Card
            title="Customer Ticket Buying Limitation"
            bordered
            hoverable
          >
            <Spin spinning={loading}>
              <Text type="secondary">Last updated: {formattedDate}</Text>
              <div className="mt-2">
                <Text strong>{limitations?.customerLimitation}</Text>
                <span className="capitalize"> Per {limitations?.type}</span>
              </div>
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
