import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TransactionChart({ orders }) {
  const getMonthlySummary = (orders) => {
    // Khởi tạo một mảng với 12 tháng
    const monthlySummary = Array.from({ length: 12 }, (_, index) => ({
      name: `tháng ${index + 1}`,
      "Đã hủy": 0,
      "Doanh thu": 0,
    }));

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = date.getMonth(); // Tháng trong JavaScript bắt đầu từ 0

      if (order.status === "Delivered") {
        monthlySummary[month]["Doanh thu"] += order.totalPrice;
      } else if (
        order.status === "Refund" ||
        order.status === "Refund Success"
      ) {
        monthlySummary[month]["Đã hủy"] += order.totalPrice;
      }
    });

    return monthlySummary;
  };

  const data = getMonthlySummary(orders);
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Giao dịch</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Doanh thu" fill="#0ea5e9" />
            <Bar dataKey="Đã hủy" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
