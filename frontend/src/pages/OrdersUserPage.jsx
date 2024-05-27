import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { LuFileClock } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { logout } from "../Redux/Actions/userActions";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, listMyOrders } from "../Redux/Actions/orderActions";

const OrdersUserPage = () => {
  const [search, setSearch] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders } = orderListMy;
  const navigate = useNavigate();
  if (userInfo === null) {
    navigate("/login");
  }
  const dispatch = useDispatch();

  const handleSearchOrder = () => {
    dispatch(getOrderDetails(search));
    setSearch("");
  };

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);
  return (
    <div className="font-Roboto">
      <Header />
      <div className="mt-[100px]">
        <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
          <div className="relative mb-[100px] z-1">
            <div className="p-[50px] rounded-[12px] bg-[#fff] shadow-2">
              {userInfo ? (
                <div className="flex mx-[-25px]">
                  {/* left */}
                  <div className="w-[25%] px-[25px]">
                    <div className="flex gap-[20px]">
                      <div className="w-[70px] h-[70px] shrink-0 rounded-[50%] overflow-hidden border border-solid border-[#1d9d06]">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvb2NSSSdTcOp8UW1II7nYq1yd0IOc9AxPFA&usqp=CAU"
                          alt=""
                          className="block w-full object-cover max-w-full h-auto"
                        />
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <p className="font-[700] text-[24px]">
                          {userInfo.user.name}
                        </p>
                        <div
                          className="text-[#7f8080] hover:text-[#f66315] duration-300 ease-in-out underline"
                          onClick={() => {
                            dispatch(logout());
                            navigate("/");
                          }}
                        >
                          Đăng xuất
                        </div>
                      </div>
                    </div>
                    {/* list */}
                    <div className="flex flex-col gap-[20px] mt-[50px]">
                      <div>
                        <Link
                          to="/tai-khoan"
                          className="no-underline duration-300 ease-in-out flex gap-[10px] py-[10px] px-[34px] items-center rounded-[48px] group hover:bg-[#feefe8]"
                        >
                          <FaRegUser className="text-[18px] text-[#7f8080] group-hover:text-[#f66315]" />
                          <span className="group-hover:text-[#f66315]">
                            Thông tin tài khoản
                          </span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/tai-khoan/change-password"
                          className="no-underline duration-300 ease-in-out flex gap-[10px] py-[10px] px-[34px] items-center rounded-[48px] group hover:bg-[#feefe8]"
                        >
                          <MdLockOutline className="text-[18px] text-[#7f8080] group-hover:text-[#f66315]" />
                          <span className="group-hover:text-[#f66315]">
                            Thay đổi mật khẩu
                          </span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/tai-khoan/orders"
                          className="no-underline duration-300 ease-in-out flex gap-[10px] py-[10px] px-[34px] items-center rounded-[48px] bg-[#feefe8]"
                        >
                          <LuFileClock className="text-[18px] text-[#f66315]" />
                          <span className="text-[#f66315]">
                            Lịch sử đơn hàng
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="w-[75%] px-[25px]">
                    <div className="relative">
                      <div className="absolute w-[1px] h-full right-[105%] bg-[#f0f0f0] top-[50%] translate-y-[-50%]"></div>
                      <div className="w-full">
                        <div className="relative">
                          <p className="mb-[20px] text-[20px] font-[700]">
                            Lịch sử mua hàng
                          </p>
                          <div>
                            <form action="">
                              <div className="flex gap-5">
                                <div className="flex shrink grow gap-[10px] items-center px-6 rounded-[34px] border border-solid border-[#c9c9c9]">
                                  <FaSearch className="text-[16px] text-[#f66315]" />
                                  <input
                                    type="text"
                                    placeholder="Tìm theo mã sản phẩm"
                                    className="w-full border-none font-[400] text-[16px] h-[44px] focus:outline-none"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                  />
                                </div>
                                <div className="flex items-center">
                                  <div
                                    onClick={handleSearchOrder}
                                    className="w-full mx-auto"
                                  >
                                    <div className="border border-solid border-[#f66315] w-full mx-auto min-w-[120px] rounded-[4rem] relative">
                                      <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                                        <div className="py-[10px] px-[20px] flex items-center justify-center gap-[6px]">
                                          <span className="text-[16px] font-[500] leading-[1.2]">
                                            Tra cứu đơn hàng
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                            <div className="mt-[30px]">
                              {orders?.orders?.length > 0 ? (
                                <table className="w-full border-collapse border-spacing-0">
                                  <thead>
                                    <tr>
                                      <th className="text-left w-[20%] font-[500] text-[#444545] border-b-[1px] border-b-solid border-b-[#e9e9e9] pb-[6px]">
                                        Mã đơn hàng
                                      </th>
                                      <th className="w-[20%] font-[500] text-[#444545] border-b-[1px] border-b-solid border-b-[#e9e9e9] pb-[6px]">
                                        Giá tiền
                                      </th>
                                      <th className="w-[20%] font-[500] text-[#444545] border-b-[1px] border-b-solid border-b-[#e9e9e9] pb-[6px]">
                                        Ngày mua hàng
                                      </th>
                                      <th className="w-[20%] font-[500] text-[#444545] border-b-[1px] border-b-solid border-b-[#e9e9e9] pb-[6px]">
                                        Trạng thái
                                      </th>
                                      <th className="w-[20%] font-[500] text-[#444545] border-b-[1px] border-b-solid border-b-[#e9e9e9] pb-[6px]">
                                        Chức năng
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {orders.orders.map((order, index) => {
                                      let date;
                                      date = new Date(order.paidAt);
                                      return (
                                        <tr key={index}>
                                          <td className="py-[23px]">
                                            #{order._id}
                                          </td>
                                          <td className="py-[23px] text-center">
                                            {order.totalPrice}đ
                                          </td>
                                          <td className="py-[23px] text-center">
                                            {`${date.getDate()} tháng ${
                                              date.getMonth() + 1
                                            }, ${date.getFullYear()}`}
                                          </td>
                                          <td className="py-[23px] text-center">
                                            {order.status === "Processing" && (
                                              <div className="text-[#1582f6] bg-[#d8eafd] flex justify-center items-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit mx-auto">
                                                Đang xử lý
                                              </div>
                                            )}
                                            {order.status ===
                                              "Transferred to delivery partner" && (
                                              <div className="text-[#15f61c] bg-[#d8fdd8] flex justify-center items-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit mx-auto">
                                                Đã giao đvvc
                                              </div>
                                            )}
                                            {order.status === "Delivered" && (
                                              <div className="text-[#15f61c] bg-[#d8fdd8] flex justify-center items-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit mx-auto">
                                                Đã hoàn thành
                                              </div>
                                            )}
                                            {order.status === "Refund" && (
                                              <div className="text-[#f61515] bg-[#fdd8d8] flex justify-center items-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit mx-auto">
                                                Hoàn tiền
                                              </div>
                                            )}
                                            {order.status ===
                                              "Refund Success" && (
                                              <div className="text-[#f61515] bg-[#fdd8d8] flex justify-center items-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit mx-auto">
                                                Đã hủy
                                              </div>
                                            )}
                                          </td>
                                          <td className="py-[23px] text-center">
                                            <Link
                                              to={`/tai-khoan/view-order/${order._id}`}
                                              className="flex group items-center justify-center gap-[10px] text-[#444545]"
                                            >
                                              <span className="duration-300 ease-in-out text-[#031230] group-hover:text-[#f66315]">
                                                Xem chi tiết
                                              </span>
                                              <FaArrowRight className="text-[#031230] group-hover:text-[#f66315]" />
                                            </Link>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersUserPage;
