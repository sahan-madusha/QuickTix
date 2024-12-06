import React from "react";
import { Card, Row, Col, Button, Tag } from "antd";
import { UpCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../Context";
import { UserRolesEnum } from "../../Constant";

export const TicketsDisplay = ({ tickets }: { tickets: any[] }) => {
  const { user, isAuthenticated } = useAuthContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-5">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
        Available Tickets 🎟️
      </h2>

      <Row gutter={[16, 16]} justify="center">
        {user.userRole === UserRolesEnum.vendor && (
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
              icon={<PlusCircleOutlined />}
              className="w-full rounded-lg bg-green-600 hover:bg-green-500"
            >
              Add new one
            </Button>
          </Card>
        )}

        {tickets.length > 0 && tickets.map((ticket) => (
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
                    <strong>Total Tickets:</strong> {ticket.qty}
                  </p>
                  {(user.userRole === UserRolesEnum.vendor ||
                    user.userRole === UserRolesEnum.admin) && (
                    <>
                      <p className="text-gray-700 my-0 py-0">
                        <strong>Sold Qty:</strong> {ticket.qty}
                      </p>
                      <p className="text-gray-700 my-0 py-0">
                        <strong>Available Qty:</strong> {ticket.qty}
                      </p>
                    </>
                  )}
                </div>
                {user.userRole === UserRolesEnum.vendor && (
                  <Button
                    type="primary"
                    icon={<UpCircleOutlined />}
                    className="w-full rounded-lg bg-blue-600 hover:bg-blue-500"
                  >
                    Update Now
                  </Button>
                )}
                {isAuthenticated &&
                  user.userRole === UserRolesEnum.customer && (
                    <Button
                      type="primary"
                      icon={<UpCircleOutlined />}
                      className="w-full rounded-lg bg-blue-600 hover:bg-blue-500"
                    >
                      Buy Now
                    </Button>
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
        ))}
      </Row>
    </div>
  );
};
