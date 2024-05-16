import React, { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../Redux/Actions/orderActions";
const columns = [
  {
    title: "Đơn hàng ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "order_date",
    key: "order_date",
  },
  {
    title: "Thành tiền",
    dataIndex: "order_total",
    key: "order_total",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => {
      let color;
      if (status === "Processing") {
        color = "blue";
      } else if (
        status === "Transferred to delivery partner" ||
        status === "Delivered"
      ) {
        color = "green";
      } else {
        color = "red";
      }
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Địa chỉ giao hàng",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Xem chi tiết",
    dataIndex: "preview",
    key: "preview",
    render: (_, record) => (
      <>
        <Link to={`/admin/orderDetail/${record.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      </>
    ),
  },
];

const AllOrders = () => {
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const dispatch = useDispatch();
  let data = [];
  if (orders) {
    data = orders.map((order) => {
      const date = new Date(order.createdAt);
      const newDate = `${date.getDate()} tháng ${
        date.getMonth() + 1
      }, ${date.getFullYear()}`;
      const address = `${order?.shippingAddress?.address} ${order?.shippingAddress?.ward}, ${order?.shippingAddress?.district} ${order?.shippingAddress?.city}`;
      return {
        id: order._id,
        customer_name: order.user.name,
        order_date: newDate,
        order_total: `${order.totalPrice}đ`,
        status: order.status,
        address,
      };
    });
  }
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <div class="text-center py-4">
        <h1 className="text-[40px] font-[700] text-[#f66315]">
          Tất cả đơn đặt hàng
        </h1>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default AllOrders;
