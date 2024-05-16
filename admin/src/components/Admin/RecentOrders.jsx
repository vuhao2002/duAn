import React from "react";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../../lib/helpers";

export default function RecentOrders({ orders }) {
  const firstSixOrders = getFirstNOrders(orders, 6);
  let recentOrderData = [
    {
      id: "1",
      product_id: "4324",
      customer_name: "Shirley A. Lape",
      order_date: "2022-05-17T03:24:00",
      order_total: "$435.50",
      current_order_status: "PLACED",
      shipment_address: "Cottage Grove, OR 97424",
    },
  ];

  recentOrderData = firstSixOrders.map((order, index) => {
    let date = new Date(order.createdAt);
    const newDate = `${date.getDate()} tháng ${
      date.getMonth() + 1
    }, ${date.getFullYear()}`;
    return {
      _id: order._id,
      product: order.cart,
      customer_name: order.user.name,
      order_date: newDate,
      order_total: `${order.totalPrice}đ`,
      current_order_status: order.status,
      shipment_address: "Cottage Grove, OR 97424",
    };
  });

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">
        Những đơn đặt hàng gần đây
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Sản phẩm</th>
              <th>Tên khách hàng</th>
              <th>Ngày đặt hàng</th>
              <th>Tổng giá</th>
              <th>Tình trạng đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={`/admin/orderDetail/${order._id}`}>
                    #{order._id.slice(0, 10)}
                  </Link>
                </td>
                <td>
                  {order.product.map((item, i) => {
                    return (
                      <div key={i}>
                        <Link to={`/admin/product/${item._id}`}>
                          #{item._id.slice(0, 10)}
                        </Link>
                      </div>
                    );
                  })}
                </td>
                <td>{order.customer_name}</td>
                <td>{order.order_date}</td>
                <td>{order.order_total}</td>
                <td>{getOrderStatus(order.current_order_status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getFirstNOrders = (orders, n) => {
  return orders.slice(0, n);
};
