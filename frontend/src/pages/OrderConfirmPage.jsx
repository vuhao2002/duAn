import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineCreditScore } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaTruckFast } from "react-icons/fa6";
import completeIcon from "../images/icon-complete.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const OrderConfirmPage = () => {
  const orderCreate = useSelector((state) => state.orderCreate);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo === null) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  const { order } = orderCreate;
  let date;
  console.log(order);
  if (!order) {
    navigate("/");
  } else {
    date = new Date(order.paidAt);
    console.log(date);
  }
  return (
    <div className="font-Roboto">
      <Header />
      {order ? (
        <div className="mt-[58px] bg-[#fff] min-h-[68vh] mb-[160px]">
          <div className="pt-[100px]">
            <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
              <div className="relative">
                <div className="flex mx-[-12px] justify-center">
                  <div className="px-[12px] w-[20%]">
                    <div className="flex items-center justify-center flex-col gap-[20px]">
                      <div className="bg-[#feefe8] relative flex items-center justify-center w-[100px] h-[100px] rounded-[50%]">
                        <FaShoppingCart className="text-[32px] text-[#f66315]" />
                        <div className="bg-[#feefe8] absolute w-[78px] top-[50%] translate-y-[-50%] left-[132px] h-[2px]"></div>
                      </div>
                      <p className="font-[700]">Đặt hàng</p>
                    </div>
                  </div>
                  <div className="px-[12px] w-[20%]">
                    <div className="flex items-center justify-center flex-col gap-[20px]">
                      <div className="bg-[#feefe8] relative flex items-center justify-center w-[100px] h-[100px] rounded-[50%]">
                        <MdOutlineCreditScore className="text-[32px] text-[#f66315]" />
                        <div className="bg-[#feefe8] absolute w-[78px] top-[50%] translate-y-[-50%] left-[132px] h-[2px]"></div>
                      </div>
                      <p className="font-[700]">Thanh toán</p>
                    </div>
                  </div>
                  <div className="px-[12px] w-[20%]">
                    <div className="flex items-center justify-center flex-col gap-[20px]">
                      <div className="bg-[#1d9d06] relative flex items-center justify-center w-[100px] h-[100px] rounded-[50%]">
                        <div className="border-[#1d9d06] absolute opacity-100 w-[120%] h-[120%] rounded-[50%] border-[2px] border-solid top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[10px]"></div>
                        <BiSolidPhoneCall className="text-[32px] text-[#fff]" />
                        <div className="bg-[#1d9d06] absolute w-[78px] top-[50%] translate-y-[-50%] left-[132px] h-[2px]"></div>
                      </div>
                      <p className="font-[700]">Xác nhận đơn hàng</p>
                    </div>
                  </div>
                  <div className="px-[12px] w-[20%]">
                    <div className="flex items-center justify-center flex-col gap-[20px]">
                      <div className="bg-[#feefe8] relative flex items-center justify-center w-[100px] h-[100px] rounded-[50%]">
                        <FaTruckFast className="text-[32px] text-[#f66315]" />
                      </div>
                      <p className="font-[700]">Giao hàng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
            <div className="relative pt-[80px] z-1">
              <div className="mb-[70px] text-center">
                <p className="text-[40px] font-[700] text-[#031230]">
                  Đặt hàng thành công
                </p>
                <p className="mt-[20px] text-[16px] font-[500]">
                  Đơn hàng đã thiết lập thành công. Chúng tôi sẽ liên lạc trực
                  tiếp
                  <br />
                  với quý khách để xác nhận.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <img
                    src={completeIcon}
                    alt=""
                    className="max-w-full h-auto "
                  />
                </div>
                <div className="w-[580px] mx-auto py-[42px] px-[12px] max-w-full relative">
                  <div className="absolute left-[50%] w-full translate-x-[-50%] bg-no-repeat bg-center bg-cover bg-[url('./images/bg-complete2.png')] right-0 bottom-0 -z-1 top-[-120px]"></div>
                  <div className="mx-auto ">
                    <div className="px-[24px] mx-[80px]">
                      <p className="relative z-1 mb-5 text-[24px] font-[700] text-[#fff] text-center">
                        Tóm tắt đơn hàng
                      </p>
                      <div className="mb-[20px] flex justify-between gap-[24px]">
                        <div className="w-[50%] text-[#fff]">
                          <p className="font-[400]">Mã đơn hàng</p>
                          <p className="font-[500] overflow-hidden line-clamp-1">
                            {order._id}
                          </p>
                        </div>
                        <div className="w-[50%] text-[#fff]">
                          <p className="font-[400]">Ngày mua hàng</p>
                          <p className="font-[500]">{`${date.getDate()} - ${
                            date.getMonth() + 1
                          } - ${date.getFullYear()}`}</p>
                        </div>
                      </div>
                      <div className="mb-[20px] flex justify-between gap-[24px]">
                        <div className="w-[50%] text-[#fff]">
                          <p className="font-[400]">Tổng cộng</p>
                          <p className="font-[500]">{order.totalPrice}đ</p>
                        </div>
                        <div className="w-[50%] text-[#fff]">
                          <p className="font-[400]">Hình thức thanh toán</p>
                          <p className="font-[500]">Nhận hàng thanh toán</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[50px] flex items-center gap-[24px] justify-center">
                <Link to="/" className="w-fit min-w-[200px]">
                  <div className="border border-solid border-[#f66315] w-full mx-auto min-w-[120px] rounded-[4rem] relative">
                    <div className="hover:text-[#fff] cursor-pointer relative hover:bg-[#f66315] bg-[#fff] text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                      <div className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]">
                        <span className="text-[16px] font-[500] leading-[1.2]">
                          Về trang chủ
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  to={`/tai-khoan/view-order/${order._id}`}
                  className="w-fit min-w-[200px]"
                >
                  <div className="border border-solid border-[#f66315] w-full mx-auto min-w-[120px] rounded-[4rem] relative">
                    <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                      <div className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]">
                        <span className="text-[16px] font-[500] leading-[1.2]">
                          Xem chi tiết đơn
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
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

export default OrderConfirmPage;
