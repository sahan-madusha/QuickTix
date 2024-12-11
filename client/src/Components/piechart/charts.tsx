import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const Charts = ({ ticketStatus, events }: { ticketStatus: any; events: any }) => {
  return (
    <div className="flex justify-around">
      {/* Ticket Status */}
      <div>
        <h3>Ticket Status</h3>
        <ResponsiveContainer width={250} height={300}>
          <PieChart>
            <Pie
              data={ticketStatus}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {ticketStatus?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Sales and Profit */}
      <div>
        <h3>Ticket Overview</h3>
        <ResponsiveContainer width={400} height={300}>
          <BarChart
            data={events}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="green" />
            <Bar dataKey="available" fill="red" />
            <Bar dataKey="total" fill="black" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
