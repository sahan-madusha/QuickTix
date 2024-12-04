import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { getAllLogs } from "../../../../Api";
import { useAuthContext } from "../../../../Context";

export const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { systemLogs } = useAuthContext();

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await getAllLogs();
      setLogs(response);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    setLogs((prevLogs) => [systemLogs, ...prevLogs]);
  }, [systemLogs]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 75,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 75,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "logMessage",
      key: "logMessage",
      width: 500,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      width: 75,
      render: (text) => <span>{text}</span>,
    },
  ];

  const rowClassName = (record) => {
    const className = `${
      record.status === "1" ? "bg-green-100" : "bg-red-100"
    }`;
    return className;
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="system-logs-container overflow-x-scroll">
      <Table
        columns={columns}
        dataSource={logs}
        rowClassName={rowClassName}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        bordered
      />
    </div>
  );
};
