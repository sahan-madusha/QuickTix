import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Card,
  Upload,
  List,
  TimePicker,
  Spin,
  Switch,
} from "antd";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import {
  AddEventData,
  GetAllEvents,
  GetEventData,
  UpdateEventData,
} from "../../../../Api";
import { IMAGE_URL } from "../../../../Constant";
import moment from "moment";

const { TextArea } = Input;

export const AddEvent = () => {
  const [form] = Form.useForm();

  const [events, setEvents] = useState([]);
  const [isSelectedEvent, setIsSelectedEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [isEventFetch, setIsEventFetch] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const fetchEvents = async () => {
    try {
      const data = await GetAllEvents();
      setEvents(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formattedDate = new Date(values.date).toISOString().split("T")[0];
    const formattedTime = new Date(values.time).toTimeString().split(" ")[0];

    try {
      if (isSelectedEvent) {
        const updatedValues = {
          ...values,
          id: selectedEvent,
          date: formattedDate,
          time: formattedTime,
          image: "lovebreeze.jpg",
          status: isToggled ? 1 : 0,
        };

        const response = await UpdateEventData(updatedValues);
        toast.success(response.message);
      } else {
        const updatedValues = {
          ...values,
          date: formattedDate,
          time: formattedTime,
          image: "lovebreeze.jpg",
          status: 1,
        };

        const response = await AddEventData(updatedValues);
        toast.success(response.message);
      }

      form.resetFields();
      setIsEventFetch(isEventFetch + 1);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = async (event) => {
    setIsLoading(true);
    try {
      const data = await GetEventData(event);
      setSelectedEvent(event);
      form.setFieldsValue({
        name: data.name,
        image: `${IMAGE_URL}/${data.image}`,
        location: data.location,
        date: data.date ? moment(data.date, "YYYY-MM-DD") : null,
        time: data.time ? moment(data.time, "HH:mm:ss") : null,
        description: data.description,
      });
      setIsToggled(data.status === 1 ? true : false);
      setIsSelectedEvent(true);
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleToggle = (checked) => {
    setIsToggled(checked);
  };

  useEffect(() => {
    fetchEvents();
  }, [isEventFetch]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          {" "}
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex gap-x-5">
          <Card className="w-full max-w-2xl shadow-lg">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-4"
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
                <Input placeholder="Enter event name" />
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

                  {isSelectedEvent && (
                    <div className="flex flex-col items-start justify-start">
                      <span>Event status</span>
                      <div>
                        <Switch checked={isToggled} onChange={handleToggle} />
                        <span style={{ marginLeft: 8 }}>
                          {isToggled ? "On" : "Off"}
                        </span>
                      </div>
                    </div>
                  )}
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
                  {isSelectedEvent ? "Update Event" : "Add Event"}
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
                <List.Item onClick={() => handleEventClick(event.id)}>
                  <Card
                    cover={
                      <img
                        alt={event.name}
                        src={`${IMAGE_URL}/${event.image}`}
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
      )}
    </>
  );
};
