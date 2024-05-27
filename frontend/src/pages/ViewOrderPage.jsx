import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { LuFileClock } from "react-icons/lu";
import { FaTruckFast } from "react-icons/fa6";
import { LiaBoxSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getOrderDetails, refundOrder } from "../Redux/Actions/orderActions";
import { logout } from "../Redux/Actions/userActions";

const ViewOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let date;
  var dateDelivered = null;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order } = orderDetails;
  console.log(loading, order);
  if (order) {
    date = new Date(order.createdAt);
  }
  if (order && order?.status === "Delivered") {
    dateDelivered = new Date(order.paidAt);
  }

  const handleRefundSuccess = () => {
    dispatch(refundOrder(id));
  };
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id, dispatch]);
  return (
    <div className="font-Roboto">
      <Header />
      {order ? (
        <div className="mt-[100px]">
          <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
            <div className="relative mb-[100px] z-1">
              <div className="p-[50px] rounded-[12px] bg-[#fff] shadow-2">
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
                          {order.user.name}
                        </p>
                        {userInfo ? (
                          <div
                            onClick={() => {
                              dispatch(logout());
                              navigate("/");
                            }}
                            className="text-[#7f8080] hover:text-[#f66315] duration-300 ease-in-out underline cursor-pointer"
                          >
                            Đăng xuất
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    {/* list */}
                    {userInfo ? (
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
                            className="no-underline duration-300 ease-in-out flex gap-[10px] py-[10px] px-[34px] items-center rounded-[48px] group hover:bg-[#feefe8]"
                          >
                            <LuFileClock className="text-[18px] text-[#7f8080] group-hover:text-[#f66315]" />
                            <span className="group-hover:text-[#f66315]">
                              Lịch sử đơn hàng
                            </span>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* right */}
                  <div className="w-[75%] px-[25px]">
                    <div className="relative">
                      <div className="absolute w-[1px] h-full right-[105%] bg-[#f0f0f0] top-[50%] translate-y-[-50%]"></div>
                      <div className="flex mx-[-12px] justify-center">
                        <div className="px-[12px] w-[33%]">
                          <div className="flex items-center justify-center flex-col gap-[20px]">
                            {order.status === "Processing" ? (
                              <div className="bg-[#1d9d06] relative flex items-center justify-center w-[48px] h-[48px] rounded-[50%]">
                                <div className="border-[#1d9d06] absolute opacity-100 w-[120%] h-[120%] rounded-[50%] border-[2px] border-solid top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[10px]"></div>
                                <LiaBoxSolid className="text-[24px] text-[#fff]" />
                                <div className="bg-[#1d9d06] absolute w-[68px] top-[50%] translate-y-[-50%] left-[92px] h-[2px]"></div>
                              </div>
                            ) : (
                              <div className="bg-[#feefe8] relative flex items-center justify-center w-[48px] h-[48px] rounded-[50%]">
                                <LiaBoxSolid className="text-[24px] text-[#f66315]" />
                                <div className="bg-[#feefe8] absolute w-[68px] top-[50%] translate-y-[-50%] left-[92px] h-[2px]"></div>
                              </div>
                            )}
                            <div className="flex items-center justify-center flex-col">
                              <p className="font-[700]">Đơn hàng đã đặt</p>
                              <p className="text-[#444545] text-[14px]">
                                {`${date.getDate()} - ${
                                  date.getMonth() + 1
                                } - ${date.getFullYear()}`}{" "}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="px-[12px] w-[33%]">
                          <div className="flex items-center justify-center flex-col gap-[20px]">
                            {order.status ===
                            "Transferred to delivery partner" ? (
                              <div className="bg-[#1d9d06] relative flex items-center justify-center w-[48px] h-[48px] rounded-[50%]">
                                <div className="border-[#1d9d06] absolute opacity-100 w-[120%] h-[120%] rounded-[50%] border-[2px] border-solid top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[10px]"></div>
                                <FaTruckFast className="text-[24px] text-[#fff]" />
                                <div className="bg-[#1d9d06] absolute w-[68px] top-[50%] translate-y-[-50%] left-[92px] h-[2px]"></div>
                              </div>
                            ) : (
                              <div className="bg-[#feefe8] relative flex items-center justify-center w-[48px] h-[48px] rounded-[50%]">
                                <FaTruckFast className="text-[24px] text-[#f66315]" />
                                <div className="bg-[#feefe8] absolute w-[68px] top-[50%] translate-y-[-50%] left-[92px] h-[2px]"></div>
                              </div>
                            )}
                            <p className="font-[700]">Giao cho ĐVVC</p>
                          </div>
                        </div>
                        <div className="px-[12px] w-[33%]">
                          <div className="flex items-center justify-center flex-col gap-[20px]">
                            {order.status === "Delivered" ? (
                              <div className="bg-[#1d9d06] relative flex items-center justify-center w-[48px] h-[48px] rounded-[50%]">
                                <div className="border-[#1d9d06] absolute opacity-100 w-[120%] h-[120%] rounded-[50%] border-[2px] border-solid top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[10px]"></div>
                                <FaTruckFast className="text-[24px] text-[#fff]" />
                              </div>
                            ) : (
                              <div className="bg-[#feefe8] relative flex items-center justify-center w-[48px] h-[48px] rounded-[50%]">
                                <FaTruckFast className="text-[24px] text-[#f66315]" />
                              </div>
                            )}
                            <div className="flex items-center justify-center flex-col">
                              <p className="font-[700]">
                                Giao hàng thành công!
                              </p>
                              {dateDelivered && (
                                <p className="text-[#444545] text-[14px]">
                                  {`${dateDelivered.getDate()} - ${
                                    dateDelivered.getMonth() + 1
                                  } - ${dateDelivered.getFullYear()}`}{" "}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[30px]">
                        <div className="flex mx-[-15px]">
                          <div className="px-[15px] w-[52%]">
                            <div className="flex items-center gap-[10px] flex-wrap">
                              <p className="text-[20px] font-[700]">
                                Chi tiết đơn hàng
                              </p>
                              <p className="text-[20px] font-[700] text-[#f66315] overflow-hidden line-clamp-1">
                                {order._id}
                              </p>
                              {order.status === "Processing" && (
                                <div className="text-[#1582f6] bg-[#d8eafd] flex items-center justify-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit">
                                  <span>Đang xử lý</span>
                                </div>
                              )}
                              {order.status ===
                                "Transferred to delivery partner" && (
                                <div className="text-[#15f61c] bg-[#d8fdd8] flex items-center justify-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit">
                                  <span>Đã giao đvvc</span>
                                </div>
                              )}
                              {order.status === "Delivered" && (
                                <div className="text-[#15f61c] bg-[#d8fdd8] flex items-center justify-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit">
                                  <span>Đã hoàn thành</span>
                                </div>
                              )}
                              {order.status === "Refund" && (
                                <div className="text-[#f61515] bg-[#fdd8d8] flex items-center justify-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit">
                                  <span>Hoàn tiền</span>
                                </div>
                              )}
                              {order.status === "Refund Success" && (
                                <div className="text-[#f61515] bg-[#fdd8d8] flex items-center justify-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit">
                                  <span>Đã hủy</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-[20px] text-[#031230]">
                              <p className="text-[18px] font-[500]">
                                {`${date.getDate()} tháng ${
                                  date.getMonth() + 1
                                } năm ${date.getFullYear()}`}
                              </p>
                              <div className="mt-[10px]">
                                <p className="mb-[20px] text-[18px] font-[500]">
                                  Chi tiết đơn hàng
                                </p>
                                <div className="flex flex-col gap-5">
                                  {order.cart.map((item) => {
                                    return (
                                      <div>
                                        <div className="flex gap-[10px]">
                                          <div className="w-[52px] h-[52px] shrink-0 rounded-[6px] overflow-hidden">
                                            <img
                                              src={item.images[0].url}
                                              alt=""
                                              className="max-w-full h-auto"
                                            />
                                          </div>
                                          <div className="flex flex-col">
                                            <p className="font-[500] overflow-hidden line-clamp-1 text-[16px]">
                                              {item.name}
                                            </p>
                                            <p className="mt-[5px] text-[#4f4f4f]">
                                              <span className="font-[600]">
                                                Số lượng:{" "}
                                              </span>
                                              <span>{item.qty}</span>
                                            </p>
                                          </div>
                                          <div className="ml-auto">
                                            <p className="font-[700] text-[#f66315]">
                                              {item.discountPrice}đ
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-[15px] w-[48%]">
                            <div className="py-[90px] px-[20px] relative z-1 mb-[30px] bg-no-repeat bg-cover bg-bottom bg-[url('./images/bg-vo.webp')]">
                              <div className="flex flex-col gap-4 pb-[24px] border-b border-b-solid border-b-[#d7d7d7] text-[15px]">
                                <div className="flex gap-[10px] justify-between">
                                  <p className="text-[#fff]">Tổng số phụ:</p>
                                  <p className="font-[700] text-[#f66315]">
                                    {order.totalPrice}đ
                                  </p>
                                </div>
                                <div className="flex gap-[10px] justify-between">
                                  <p className="text-[#fff]">Giao nhận hàng:</p>
                                  <p className="text-[#fff]">
                                    Theo chi phí ĐVVC ( 30-80k) Chuyển khoản
                                    trước freeship
                                  </p>
                                </div>
                                <div className="flex gap-[10px] justify-between">
                                  <p className="text-[#fff]">
                                    Phương thức thanh toán:
                                  </p>
                                  <p className="text-[#fff]">
                                    Nhận hàng thanh toán
                                  </p>
                                </div>
                              </div>
                              <div className="mt-[20px] flex gap-[10px] justify-between">
                                <p className="text-[#fff] text-[20px] font-[700]">
                                  Tổng cộng
                                </p>
                                <p className="text-[#f66315] text-[20px] font-[700]">
                                  {order.totalPrice}đ
                                </p>
                              </div>
                            </div>
                            {order.status === "Processing" && userInfo && (
                              <div
                                onClick={handleRefundSuccess}
                                className="border border-solid border-[#f66315] ml-auto w-fit rounded-[4rem] relative"
                              >
                                <div className="hover:text-[#fff] cursor-pointer relative hover:bg-[#f66315] bg-[#fff] text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                                  <div className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]">
                                    <span className="text-[16px] font-[500] leading-[1.2]">
                                      Hủy đơn hàng
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
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
      <Footer />
    </div>
  );
};

export default ViewOrderPage;
