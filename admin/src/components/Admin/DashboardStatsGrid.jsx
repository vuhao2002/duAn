import React from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";

export default function DashboardStatsGrid({ orders, users }) {
  let totalPrice;
  let totalPriceToday;
  let totalPriceCanceled;
  let totalPriceCanceledToday;
  if (orders && users) {
    totalPrice = getTotalPrice(orders, "Delivered");
    totalPriceToday = getTodayTotalPrice(orders, "Delivered");
    totalPriceCanceled = getTotalPrice(orders, "Refund Success");
    totalPriceCanceledToday = getTodayTotalPrice(orders, "Refund Success");
  }
  return (
    <>
      {orders && users ? (
        <div className="flex gap-4">
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
              <IoBagHandle className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                Tổng doanh thu
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  {totalPrice}đ
                </strong>
                <span className="text-sm text-green-500 pl-2">
                  +{totalPriceToday}đ
                </span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
              <IoPieChart className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                tổng giá trị đơn hàng bị hủy
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  {totalPriceCanceled}đ
                </strong>
                <span className="text-sm text-red-500 pl-2">
                  +{totalPriceCanceledToday}đ
                </span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
              <IoPeople className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                Tổng số khách hàng
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  {users.length}
                </strong>
                <span className="text-sm text-green-500 pl-2">
                  +{getTodayTotalCustomers(users)}
                </span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
              <IoCart className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                Tổng số đơn đặt hàng
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  {orders.length}
                </strong>
                <span className="text-sm text-green-500 pl-2">
                  +{getTodayOrders(orders)}
                </span>
              </div>
            </div>
          </BoxWrapper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}

const getTotalPrice = (orders, status) => {
  return orders.reduce((accumulator, order) => {
    if (status) {
      if (order.status === status) {
        return accumulator + order.totalPrice;
      }
      return accumulator;
    }
    return accumulator + order.totalPrice;
  }, 0);
};

const getTodayTotalPrice = (orders, status) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startOfDay && orderDate <= endOfDay;
  });

  return todayOrders.reduce((accumulator, order) => {
    if (status) {
      if (order.status === status) {
        return accumulator + order.totalPrice;
      }
      return accumulator;
    }
    return accumulator + order.totalPrice;
  }, 0);
};

const getTodayTotalCustomers = (users) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const todayUsers = users.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startOfDay && orderDate <= endOfDay;
  });
  return todayUsers.length;
};

const getTodayOrders = (orders) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startOfDay && orderDate <= endOfDay;
  });
  return todayOrders.length;
};
