import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Spin } from "antd";

export const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        // const response = await fetchSystemLogs(); // Mock API call
        const data = [
          {
            id: 1,
            time: "2024-12-02 10:30:00",
            action: "User Login",
            user: "admin",
            status: "success",
          },
          {
            id: 2,
            time: "2024-12-02 11:00:00",
            action: "Data Update",
            user: "admin",
            status: "error",
          },
        ];
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "success" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="system-logs-container">
      <Table
        columns={columns}
        dataSource={logs}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};
