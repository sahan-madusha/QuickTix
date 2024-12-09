import React, { useState } from "react";
import { Card, Row, Col, Button, Tag, Input } from "antd";
import {
  UpCircleOutlined,
  PlusCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "../../Context";
import { IMAGE_URL, UserRolesEnum } from "../../Constant";
import { toast } from "react-toastify";
import { TicketPurchase } from "../../Api";

export const TicketsDisplay = ({
  tickets,
  showModal,
  setSelectedTicket,
  selectedEvent,
}: {
  tickets: any[];
  showModal?: any;
  setSelectedTicket?: any;
  selectedEvent?: any;
}) => {
  const { user, isAuthenticated } = useAuthContext();
  const [isBtnDisable, setIsBtnDisabled] = useState(true);
  const [updatedTicketId, setUpdatedTicketId] = useState<number | null>(null);

  //data
  const [ticketQty, setTicketQty] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleTicketQty = (
    maxQty: number,
    enteredQty: string,
    ticketId: number,
    price: number
  ) => {
    const data = parseInt(enteredQty, 10);

    if (isNaN(data) || data === 0 || data > maxQty) {
      toast.warn("Invalid inputs. Please enter a valid ticket quantity.");
      setIsBtnDisabled(true);
      setTotalAmount(0);
    } else {
      setIsBtnDisabled(false);
      setTicketQty(data);
      setTotalAmount(price * data);
      setUpdatedTicketId(ticketId);
    }
  };

  const handleTicketPurchase = async (ticketId: any) => {
    const req = {
      id: ticketId,
      userId: user.userId,
      qty: ticketQty,
    };

    try {
      const res = await TicketPurchase(req);
      toast.success(res.message);
    } catch (error) {
      toast.success("Somthing went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-5">
      {selectedEvent && (
        <>
          <Card className="mb-3 shadow-lg">
            <div className="flex">
              <div>
                <img
                  alt={selectedEvent?.name}
                  src={`${IMAGE_URL}/${selectedEvent?.image}`}
                  className="object-cover h-56 w-full"
                />
              </div>
              <div className="ms-3">
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {selectedEvent?.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedEvent?.description}
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <Tag icon={<CalendarOutlined />} color="blue">
                    {selectedEvent?.date}
                  </Tag>
                  <Tag icon={<ClockCircleOutlined />} color="green">
                    {selectedEvent?.time}
                  </Tag>
                </div>
                <div className="flex items-center mb-4">
                  <EnvironmentOutlined className="mr-2 text-red-500" />
                  <a
                    href={selectedEvent?.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Location
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <h2 className="text-3xl mt-5 font-bold text-center text-blue-600 mb-10">
            Available Tickets 🎟️
          </h2>
        </>
      )}

      <Row gutter={[16, 16]} justify="center">
        {user.userRole === UserRolesEnum.vendor && selectedEvent && (
          <Card
            hoverable
            className="shadow-lg rounded-xl align-middle justify-center transform transition-transform hover:scale-105"
            cover={
              <div className="bg-green-100 text-green-600 text-lg font-bold p-4 text-center rounded-t-xl">
                Add new ticket
              </div>
            }
          >
            <Button
              type="primary"
              onClick={() => {
                showModal(false);
              }}
              icon={<PlusCircleOutlined />}
              className="w-full rounded-lg bg-green-600 hover:bg-green-500"
            >
              Add new one
            </Button>
          </Card>
        )}

        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Col xs={24} md={8} key={ticket.id}>
              <Card
                hoverable
                className="shadow-lg rounded-xl transform transition-transform hover:scale-105"
                cover={
                  <div className="bg-blue-100 text-blue-600 text-lg font-bold p-4 text-center rounded-t-xl">
                    {ticket.name}
                  </div>
                }
              >
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-700 my-0 py-0">
                      <strong>Price:</strong> Rs:{ticket.price}.00
                    </p>
                    <p className="text-gray-700 my-0 py-0">
                      <strong>Available Qty:</strong> {ticket.qty}
                    </p>

                    {(user.userRole === UserRolesEnum.vendor ||
                      user.userRole === UserRolesEnum.admin) && (
                      <>
                        <p className="text-gray-700 my-0 py-0">
                          <strong>Sold Qty:</strong> {ticket.qty}
                        </p>
                        <p className="text-gray-700 my-0 py-0">
                          <strong>Total Tickets:</strong> {ticket.qty}
                        </p>
                      </>
                    )}
                  </div>
                  {user.userRole === UserRolesEnum.vendor && (
                    <Button
                      type="primary"
                      icon={<UpCircleOutlined />}
                      onClick={() => {
                        showModal(true);
                        setSelectedTicket(ticket);
                      }}
                      className="w-full rounded-lg bg-blue-600 hover:bg-blue-500"
                    >
                      Update Now
                    </Button>
                  )}
                  {isAuthenticated &&
                    user.userRole === UserRolesEnum.customer && (
                      <>
                        <Input
                          placeholder="Enter ticket qty you buy"
                          className="rounded-lg"
                          size="middle"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleTicketQty(
                              ticket.qty,
                              e.target.value,
                              ticket.id,
                              ticket.price
                            );
                          }}
                        />
                        <p className="my-3">
                          {updatedTicketId == ticket.id && totalAmount > 0 && (
                            <span>Total Amount Rs: {totalAmount}.00</span>
                          )}
                        </p>
                        <Button
                          type="primary"
                          icon={<UpCircleOutlined />}
                          disabled={
                            isBtnDisable || updatedTicketId !== ticket.id
                          }
                          onClick={() => {
                            handleTicketPurchase(ticket.id);
                          }}
                          className="w-full rounded-lg bg-blue-600 hover:bg-blue-500"
                        >
                          Buy Now
                        </Button>
                      </>
                    )}

                  {!isAuthenticated && (
                    <Button
                      type="primary"
                      icon={<UpCircleOutlined />}
                      className="w-full rounded-lg bg-blue-600 hover:bg-blue-500"
                    >
                      Please log first
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <p>No tickets available</p>
        )}
      </Row>
    </div>
  );
};
