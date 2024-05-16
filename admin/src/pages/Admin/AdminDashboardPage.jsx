import React, { useEffect } from "react";
import DashboardStatsGrid from "../../components/Admin/DashboardStatsGrid";
import TransactionChart from "../../components/Admin/TransactionChart";
import BuyerProfilePieChart from "../../components/Admin/BuyerProfilePieChart";
import RecentOrders from "../../components/Admin/RecentOrders";
import PopularProducts from "../../components/Admin/PopularProducts";
import Sidebar from "../../components/Admin/Layout/Sidebar";
import Header from "../../components/Admin/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../Redux/Actions/orderActions";
import { listUser } from "../../Redux/Actions/userActions";
import { listProduct } from "../../Redux/Actions/productActions";
const AdminDashboardPage = () => {
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
    dispatch(listUser());
    dispatch(listProduct());
  }, [dispatch]);
  return (
    <div>
      {orders && users && products ? (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-4 min-h-0 overflow-auto">
              <div className="flex flex-col gap-4">
                <DashboardStatsGrid orders={orders} users={users} />
                <div className="flex flex-row gap-4 w-full">
                  <TransactionChart orders={orders} />
                  <BuyerProfilePieChart orders={orders} />
                </div>
                <div className="flex flex-row gap-4 w-full">
                  <RecentOrders orders={orders} />
                  <PopularProducts products={products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminDashboardPage;
