import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Consultation from "../components/Route/Consultation/Consultation";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineCreditScore } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaTruckFast } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../Redux/Actions/orderActions";
const PaymentPage = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let sum = 0;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo === null) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  const [name, setName] = useState(userInfo?.user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    userInfo?.user?.phoneNumber || ""
  );
  const [city, setCity] = useState(userInfo?.user?.addresses[0]?.city || "");
  const [district, setDistrict] = useState(
    userInfo?.user?.addresses[0]?.district || ""
  );
  const [ward, setWard] = useState(userInfo?.user?.addresses[0]?.ward || "");
  const [address, setAddress] = useState(
    userInfo?.user?.addresses[0]?.address || ""
  );
  const [note, setNote] = useState("");

  const handleAddToOrder = () => {
    if (cartItems.length > 0) {
      const shippingAddress = {
        name,
        phoneNumber,
        city,
        district,
        ward,
        address,
        note,
      };
      const newData = {
        cart: cartItems,
        shippingAddress,
        user: userInfo?.user,
        totalPrice: sum,
      };
      dispatch(createOrder(newData));
      navigate(`/xac-nhan-don-hang`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="font-Roboto">
      <Header />
      <div className="mt-[58px] bg-[#fff] min-h-[68vh] mb-[40px]">
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
                    <div className="bg-[#1d9d06] relative flex items-center justify-center w-[100px] h-[100px] rounded-[50%]">
                      <div className="border-[#1d9d06] absolute opacity-100 w-[120%] h-[120%] rounded-[50%] border-[2px] border-solid top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[10px]"></div>
                      <MdOutlineCreditScore className="text-[32px] text-[#fff]" />
                      <div className="bg-[#1d9d06] absolute w-[78px] top-[50%] translate-y-[-50%] left-[132px] h-[2px]"></div>
                    </div>
                    <p className="font-[700]">Thanh toán</p>
                  </div>
                </div>
                <div className="px-[12px] w-[20%]">
                  <div className="flex items-center justify-center flex-col gap-[20px]">
                    <div className="bg-[#feefe8] relative flex items-center justify-center w-[100px] h-[100px] rounded-[50%]">
                      <BiSolidPhoneCall className="text-[32px] text-[#f66315]" />
                      <div className="bg-[#feefe8] absolute w-[78px] top-[50%] translate-y-[-50%] left-[132px] h-[2px]"></div>
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
        <div className="relative z-1 mt-[100px]">
          <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
            <div className="flex items-center justify-center gap-[10px]">
              <p className="text-[40px] font-[700] text-[#031230]">
                Thanh toán
              </p>
            </div>

            <div className="mt-[50px]">
              <form action="">
                <div className="flex mx-[-25px]">
                  <div className="w-[50%] px-[25px]">
                    <div>
                      <p className="mb-[20px] text-[24px] font-[700]">
                        Địa chỉ giao hàng
                      </p>
                      <div className="flex flex-wrap gap-y-[20px] mx-[-12px]">
                        <div className="w-[50%] px-[12px]">
                          <label
                            htmlFor=""
                            className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                          >
                            Họ và tên đệm&nbsp;
                            <abbr
                              title="bắt buộc"
                              className="text-[red] font-[700] border-0 no-underline"
                            >
                              *
                            </abbr>
                          </label>
                          <span className="relative flex">
                            <input
                              type="text"
                              placeholder="Nhập họ và tên đệm"
                              className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </span>
                        </div>

                        <div className="w-[50%] px-[12px]">
                          <label
                            htmlFor=""
                            className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                          >
                            Số điện thoại&nbsp;
                            <abbr
                              title="bắt buộc"
                              className="text-[red] font-[700] border-0 no-underline"
                            >
                              *
                            </abbr>
                          </label>
                          <span className="relative flex">
                            <input
                              type="text"
                              placeholder="Nhập số điện thoại"
                              className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                          </span>
                        </div>
                        <div className="w-[50%] px-[12px]">
                          <label
                            htmlFor=""
                            className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                          >
                            Tỉnh / Thành phố&nbsp;
                            <abbr
                              title="bắt buộc"
                              className="text-[red] font-[700] border-0 no-underline"
                            >
                              *
                            </abbr>
                          </label>
                          <span className="relative flex">
                            <input
                              type="text"
                              placeholder="Nhập tỉnh/thành phố"
                              className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                            />
                          </span>
                        </div>
                        <div className="w-[50%] px-[12px]">
                          <label
                            htmlFor=""
                            className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                          >
                            Quận / Huyện&nbsp;
                            <abbr
                              title="bắt buộc"
                              className="text-[red] font-[700] border-0 no-underline"
                            >
                              *
                            </abbr>
                          </label>
                          <span className="relative flex">
                            <input
                              type="text"
                              placeholder="Nhập quận / huyện"
                              className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                              value={district}
                              onChange={(e) => setDistrict(e.target.value)}
                              required
                            />
                          </span>
                        </div>
                        <div className="w-[50%] px-[12px]">
                          <label
                            htmlFor=""
                            className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                          >
                            Phường / Xã&nbsp;
                            <abbr
                              title="bắt buộc"
                              className="text-[red] font-[700] border-0 no-underline"
                            >
                              *
                            </abbr>
                          </label>
                          <span className="relative flex">
                            <input
                              type="text"
                              placeholder="Nhập phường / xã"
                              className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                              value={ward}
                              onChange={(e) => setWard(e.target.value)}
                              required
                            />
                          </span>
                        </div>
                        <div className="w-[50%] px-[12px]">
                          <label
                            htmlFor=""
                            className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                          >
                            Địa chỉ&nbsp;
                            <abbr
                              title="bắt buộc"
                              className="text-[red] font-[700] border-0 no-underline"
                            >
                              *
                            </abbr>
                          </label>
                          <span className="relative flex">
                            <input
                              type="text"
                              placeholder="Địa chỉ"
                              className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                            />
                          </span>
                        </div>
                        <div className="w-[100%] px-[12px]">
                          <label
                            htmlFor=""
                            className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                          >
                            Ghi chú đơn hàng (tùy chọn)
                          </label>
                          <span className="relative flex">
                            <textarea
                              name=""
                              id=""
                              cols="5"
                              rows="2"
                              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                              className="w-full min-h-[100px] px-[15px] py-[10px] rounded-[8px] border border-solid border-[#c9c9c9] font-[400] text-[14px] text-[#031230] leading-[1.1] focus:border-[#f66215] focus:outline-none"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  {cartItems ? (
                    <div className="w-[50%] px-[25px]">
                      <div className="bg-[#031230] py-[28px] px-[30px] relative">
                        <div className="absolute bottom-[100%] left-0 right-0 bg-[url('./images/ponut-bg.webp')] bg-no-repeat bg-cover h-[20px]"></div>
                        <p className="mb-[20px] text-[24px] font-[700] text-[#fff] duration-300 ease-in-out text-center">
                          Đơn hàng của bạn
                        </p>
                        <div className="pb-[30px] border-b-[1px] border-b-solid border-[#efefef]">
                          <div className="my-[20px] flex gap-[10px]">
                            <p className="text-[#fff] text-[16px] font-[700]">
                              Sản phẩm
                            </p>
                            <div className="min-w-[26px] h-[26px] flex items-center justify-center rounded-[50%] p-1 text-[#fff] bg-[#f66315]">
                              {cartItems?.length}
                            </div>
                          </div>
                          <div className="mb-[10px]">
                            {cartItems?.map((item, index) => {
                              sum += item?.qty * item?.discountPrice;
                              return (
                                <div className="mb-[20px]" key={index}>
                                  <div className="flex gap-[10px]">
                                    <div className="w-[58px] h-[58px] rounded-[6px] overflow-hidden border border-solid border-[#feefe8]">
                                      <img
                                        className="block w-full object-cover max-w-full h-auto"
                                        src={item?.images[0]?.url}
                                        alt=""
                                      />
                                    </div>
                                    <div className="flex flex-col gap-[8px]">
                                      <p className="overflow-hidden line-clamp-1 text-[16px] text-[#fff] font-[500]">
                                        {item?.name}{" "}
                                      </p>
                                      <div className="mt-auto text-[#fff]">
                                        <span>{item?.qty}</span> x{" "}
                                        <span>{item?.discountPrice} đ</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex gap-1 justify-between items-center mt-[30px]">
                          <p className="text-[#fff] text-[20px]">Tổng</p>
                          <p className="text-[20px] text-[#f66315] font-[700]">
                            {sum}đ
                          </p>
                        </div>
                        <div className="mt-[30px] flex items-center gap-[24px]">
                          <div className="w-[50%] mx-auto">
                            <div className="border border-solid border-[#f66315] w-full mx-auto min-w-[120px] rounded-[4rem] relative">
                              <div
                                onClick={handleAddToOrder}
                                className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex"
                              >
                                <div className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]">
                                  <FaShoppingCart className="text-[16px]" />
                                  <span className="text-[16px] font-[500] leading-[1.2]">
                                    Đặt hàng
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-[100%] left-0 right-0 bg-[url('./images/ponut-bg.webp')] bg-no-repeat bg-cover h-[20px] scale-y-[-1]"></div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Consultation />
      <Footer />
    </div>
  );
};

export default PaymentPage;
