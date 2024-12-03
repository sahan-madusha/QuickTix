import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Card,
  Upload,
  List,
  TimePicker,
} from "antd";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import { AddEventData } from "../../../../Api";

const { TextArea } = Input;

export const AddEvent = () => {
  const [form] = Form.useForm();

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Music Concert",
      image: "https://via.placeholder.com/150",
      location: "New York, NY",
      date: "2024-12-10",
      description: "A live music concert featuring popular artists.",
    },
    {
      id: 2,
      name: "Art Exhibition",
      image: "https://via.placeholder.com/150",
      location: "Los Angeles, CA",
      date: "2024-12-15",
      description: "An exhibition showcasing modern art from various artists.",
    },
    {
      id: 3,
      name: "Tech Conference",
      image: "https://via.placeholder.com/150",
      location: "San Francisco, CA",
      date: "2024-12-20",
      description: "A conference exploring the latest trends in technology.",
    },
    {
      id: 4,
      name: "Food Festival",
      image: "https://via.placeholder.com/150",
      location: "Chicago, IL",
      date: "2024-12-05",
      description: "A festival celebrating food from around the world.",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSubmit = async (values) => {
    const formattedDate = new Date(values.date).toISOString().split("T")[0];
    const formattedTime = new Date(values.time).toTimeString().split(" ")[0];

    try {
      const updatedValues = {
        ...values,
        date: formattedDate,
        time: formattedTime,
        image: "sampleimage.png",
        status: 1,
      };

      const response = await AddEventData(updatedValues);
      toast.success(response.message);
      form.resetFields();

    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFailedSubmit = (errorInfo) => {
    console.error("Validation Failed:", errorInfo);
  };

  // Image upload props
  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        toast.error(`${file.name} is not an image file.`);
      }
      return isImage || Upload.LIST_IGNORE;
    },
    maxCount: 1,
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    console.log(selectedEvent);
  };

  return (
    <div className="flex gap-x-5">
      <Card className="w-full max-w-2xl shadow-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={handleFailedSubmit}
          className="space-y-4"
          initialValues={selectedEvent}
        >
          {/* Event Name */}
          <Form.Item
            label="Event Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter the event name",
              },
            ]}
          >
            <Input
              placeholder="Enter event name"
              value={selectedEvent?.name || ""}
            />
          </Form.Item>

          <div className="flex justify-between w-full">
            <div className="w-5/12">
              {/* Event Image */}
              <Form.Item
                label="Event Image"
                name="image"
                valuePropName="file"
                rules={[
                  {
                    required: true,
                    message: "Please upload an event image",
                  },
                ]}
              >
                <Upload {...uploadProps} listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
            <div className="w-7/12">
              {/* Event Location */}
              <Form.Item
                label="Location"
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Please add google location of event",
                  },
                ]}
              >
                <Input
                  placeholder="Please add google location of event"
                  className="w-full"
                />
              </Form.Item>
              {/* Event Date */}
              <Form.Item
                label="Event Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please select the event date",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item
                label="Event Time"
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Please select the event time",
                  },
                ]}
              >
                <TimePicker className="w-full" format="HH:mm" />
              </Form.Item>
            </div>
          </div>

          {/* Event Description */}
          <Form.Item
            label="Event Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the event description",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter event description" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {selectedEvent ? "Update Event" : "Add Event"}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Display All Events */}
      <Card className="w-full max-w-2xl shadow-lg">
        <List
          grid={{ gutter: 6, column: 3 }}
          dataSource={events}
          renderItem={(event) => (
            <List.Item onClick={() => handleEventClick(event)}>
              <Card
                cover={
                  <img
                    alt={event.name}
                    src={event.image}
                    className="h-28 w-24 object-cover"
                  />
                }
                hoverable
              >
                <Card.Meta title={event.name} />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};
