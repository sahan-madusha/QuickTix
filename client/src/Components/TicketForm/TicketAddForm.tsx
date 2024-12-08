import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  notification,
  Card,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TicketsDisplay } from "../../Components";
import { AddUpdateEventData } from "../../Api";
import { useAuthContext } from "../../Context";
import { toast } from "react-toastify";

export const TicketAddForm = (selectedEvent: any) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateTicket, setIsUpdateTicket] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>();
  const { user } = useAuthContext();

  const showModal = (isUdateTicketParam) => {
    setIsUpdateTicket(isUdateTicketParam);
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      let req = {
        ...values,
        eventId: selectedEvent?.selectedEvent?.id,
        userId: user?.userId,
      };
      if (selectedTicket?.id) {
        req = { ...req, id: selectedTicket.id };
      }
      const res = await AddUpdateEventData(req);
      toast.success(res.message);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      toast.success("Somthing went wrong");
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTicket) {
      form.setFieldsValue({
        name: selectedTicket.name,
        price: selectedTicket.price,
        description: selectedTicket.description,
        qty: selectedTicket.qty,
      });
    } else {
      form.resetFields();
    }
  }, [selectedTicket, form]);

  return (
    <div className="flex flex-col justify-center pt-5 min-h-screen ">
      <TicketsDisplay
        tickets={selectedEvent?.selectedEvent?.tickets ?? []}
        showModal={showModal}
        setSelectedTicket={setSelectedTicket}
        selectedEvent={selectedEvent?.selectedEvent}
      />

      <Modal
        title={
          <h2 className="text-xl font-bold text-blue-600">
            {isUpdateTicket ? "Update" : "Add new"} Ticket 🎟️
          </h2>
        }
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false);
          setSelectedTicket(false);
        }}
        footer={null}
        onClose={() => {}}
        className="rounded-lg"
      >
        <Card bordered={false} className="shadow-none">
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="space-y-5"
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
                {isUpdateTicket ? "Update" : "Add new"} Ticket
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
