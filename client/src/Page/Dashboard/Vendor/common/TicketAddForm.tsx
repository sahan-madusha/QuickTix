import React, { useState } from "react";
import { Form, Input, Button, InputNumber, notification, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TicketsDisplay } from "../../../../Components";

const TicketAddForm = (selectedEvent: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log(values);
      setTimeout(() => {
        setLoading(false);
        notification.success({
          message: "Success 🎉",
          description: "Your ticket has been added successfully!",
        });
        form.resetFields();
      }, 1000);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error ❌",
        description: "Failed to add the ticket. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center pt-5 min-h-screen ">
      <TicketsDisplay tickets={selectedEvent?.selectedEvent?.tickets ?? []} />

      <Card
        className="w-full max-w-lg shadow-2xl bg-white rounded-xl hover:shadow-3xl"
        bordered={false}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Add New Ticket 🎟️
        </h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="space-y-5"
          initialValues={{
            name: "gold 3 up 2",
            price: 1000,
            description: "string",
            qty: 100,
          }}
        >
          <Form.Item
            label="Ticket Name"
            name="name"
            rules={[
              { required: true, message: "Please input the ticket name!" },
            ]}
          >
            <Input
              placeholder="Enter ticket name"
              className="rounded-lg"
              size="large"
            />
          </Form.Item>

          <div className="flex justify-between gap-x-6">
            <Form.Item
              label="Price ($)"
              name="price"
              rules={[
                { required: true, message: "Please input the ticket price!" },
              ]}
            >
              <InputNumber
                min={1}
                className="w-full rounded-lg"
                size="large"
                placeholder="1000"
              />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="qty"
              rules={[
                {
                  required: true,
                  message: "Please input the ticket quantity!",
                },
              ]}
            >
              <InputNumber
                min={1}
                className="w-full rounded-lg"
                size="large"
                placeholder="100"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the ticket description!",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Add a short description..."
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<PlusOutlined />}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg h-12"
            >
              Add Ticket
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TicketAddForm;
