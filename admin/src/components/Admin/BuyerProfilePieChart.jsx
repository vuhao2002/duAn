import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function BuyerProfilePieChart({ orders }) {
  let data;
  if (orders) {
    const successfulDelivery = countStatusOrders(orders, "Delivered");

    const pendingDelivery = countStatusOrders(
      orders,
      "Processing",
      "Transferred to delivery partner"
    );
    const canceledDelivery = countStatusOrders(
      orders,
      "Refund",
      "Refund Success"
    );
    data = [
      { name: "Đã giao", value: successfulDelivery },
      { name: "Đang giao", value: pendingDelivery },
      { name: "Đã hủy", value: canceledDelivery },
    ];
  }
  return (
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">Trạng thái đơn hàng</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const countStatusOrders = (orders, status, status2) => {
  if (status2) {
    const deliveredOrders = orders.filter((order) => {
      return order.status === status || order.status === status2;
    });
    return deliveredOrders.length;
  }
  const deliveredOrders = orders.filter((order) => order.status === status);
  return deliveredOrders.length;
};
