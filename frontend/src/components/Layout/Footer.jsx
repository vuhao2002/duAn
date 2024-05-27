import React from "react";
import logo from "../../images/logo-removebg.png";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import {
  FaPhoneVolume,
  FaMoneyBill,
  FaFacebook,
  FaFacebookMessenger,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const Footer = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const handleMessageSubmit = async () => {
    if (userInfo) {
      const groupTitle = userInfo.user.name;
      const shopId = "65f87d3cd8879439907a05dd";
      const userId = userInfo.user._id;
      await axios
        .post(
          `${server}/conversation/create-new-conversation`,
          {
            groupTitle,
            userId,
            shopId,
          },
          { withCredentials: true }
        )
        .then((res) => {
          navigate(`/inbox/${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Vui lòng đăng nhập để tạo một cuộc trò chuyện!");
    }
  };

  return (
    <div className="py-[60px] relative bg-5">
      <div className="absolute left-0 top-0 right-0 bottom-0 bg-[#e27237] -z-1"></div>
      <div className="absolute w-[22%] right-0 top-0 translate-y-[-50%]">
        <img
          src="https://fbshop.vn/template/assets/images/dcor-ft.webp"
          alt=""
          className="block w-full max-w-full h-auto"
        />
      </div>
      <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
        <div className="xl:px-[30px] lg:px-[12px]  px-[12px] flex max-lg:flex-wrap items-center">
          {/* left */}
          <div className="xl:mx-[30px] lg:mx-[12px] lg:w-[25%] relative w-full mx-auto ">
            <div className="flex lg:flex-col lg:gap-[20px] flex-row flex-wrap gap-[24px] m-[-12px]">
              <div className="shrink-0 flex items-center justify-center w-full">
                <a href="/">
                  <img
                    src={logo}
                    alt=""
                    width="397"
                    height="398"
                    className="max-w-full h-auto w-[100px]"
                  />
                </a>
              </div>
              <div className="text-[14px] text-[#444545]">
                <p className="mb-1">Công ty TNHH Badminton Shop Việt Nam </p>
                <div className="mb-[10px]">
                  <div className="flex gap-1">
                    <RiMapPin2Fill className="text-[#f66315] mt-[2px]" />
                    <p>
                      <span className="font-[500]">Địa chỉ: </span>12/70 ngõ 102
                      Trường Chinh, Đống Đa, Hà Nội
                    </p>
                  </div>
                </div>
                <div className="mb-[10px]">
                  <div className="flex gap-1">
                    <FaUser className="text-[#f66315] mt-[2px] text-[12px]" />
                    <p>
                      <span className="font-[500]">Người đại diện: </span>Cao
                      Hải Đăng
                    </p>
                  </div>
                </div>
                <div className="mb-[10px]">
                  <div className="flex gap-1">
                    <IoMdMail className="text-[#f66315] mt-[2px]" />
                    <p>
                      <span className="font-[500]">Email: </span>
                      badmintonshop@gmail.com
                    </p>
                  </div>
                </div>
                <p>
                  Giấy phép kinh doanh số: 0109370129 đăng ký thay đổi lần 1
                  ngày 21/10/2020 (đăng ký lần đầu ngày 09/10/2020) do sở kế
                  hoạch và đầu tư Hà Nội cấp.
                </p>
                <div className="w-[120px] flex items-center justify-center mx-auto mb-[8px]">
                  <a
                    href="http://online.gov.vn/Home/WebDetails/94133"
                    className="cursor-pointer"
                  >
                    <img
                      src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png"
                      alt=""
                      width="230"
                      height="86"
                      className="max-w-full h-auto w-full block"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="xl:px-[30px] px-[12px] lg:w-[75%] w-full">
            <div className="pb-[34px] relative">
              <div className="flex mx-[-4px] justify-between flex-wrap gap-[12px]">
                <div className="px-1">
                  <div className="flex gap-1">
                    <FaPhoneVolume className="text-[16px] text-[#f66315]" />
                    <div className="flex flex-col">
                      <p className="text-[14px] text-[#444545] font-[500]">
                        Tư vấn khách hàng
                      </p>
                      <p className="text-[16px] text-[#f66315] font-[600] items-center gap-1">
                        0979.170.274
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex gap-1">
                    <FaPhoneVolume className="text-[16px] text-[#f66315]" />
                    <div className="flex flex-col">
                      <p className="text-[14px] text-[#444545] font-[500]">
                        Bảo hành và CSKH
                      </p>
                      <p className="text-[16px] text-[#f66315] font-[600] items-center gap-1">
                        0984.332.823
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex gap-1">
                    <FaPhoneVolume className="text-[16px] text-[#f66315]" />
                    <div className="flex flex-col">
                      <p className="text-[14px] text-[#444545] font-[500]">
                        Hàn vợt cacbon
                      </p>
                      <p className="text-[16px] text-[#f66315] font-[600] items-center gap-1">
                        0866.346.993
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex gap-1">
                    <RiMapPin2Fill className="text-[16px] text-[#f66315]" />
                    <div className="flex flex-col">
                      <p className="text-[14px] text-[#444545] font-[500]">
                        Xem hệ thống cửa hàng
                      </p>
                      <p className="text-[16px] text-[#f66315] font-[600] items-center gap-1">
                        Hà Nội và Tp.Hồ Chí Minh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-[20px]">
              <div className="flex mx-[-4px] justify-between flex-wrap">
                <div className="px-1">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-[16px] font-[500] text-[#031230]">
                      Sản phẩm
                    </p>
                    <div>
                      <ul className="list-none font-[14px] text-[#444545] text-[14px]">
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Vợt cầu lông
                        </li>
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Giày cầu lông
                        </li>
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Túi vợt cầu lông
                        </li>
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Balo cầu lông
                        </li>
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Phụ kiện cầu lông
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-[16px] font-[500] text-[#031230]">
                      Hướng dẫn khách hàng
                    </p>
                    <div>
                      <ul className="list-none font-[14px] text-[#444545] text-[14px]">
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Chính sách bảo hành
                        </li>
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Chính sách đổi trả hàng
                        </li>
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Chính sách vận chuyển
                        </li>
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Chính sách thanh toán
                        </li>
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Chính sách bảo mật
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-[16px] font-[500] text-[#031230]">
                      Hỗ trợ khách hàng
                    </p>
                    <div>
                      <ul className="list-none font-[14px] text-[#444545] text-[14px]">
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Hướng dẫn mua hàng
                        </li>
                        <li className="hover:text-[#f66315] cursor-pointer mb-[10px]">
                          Hình thức giao hàng
                        </li>
                      </ul>
                    </div>
                    <div className="mt-[10px]">
                      <p className="text-[16px] font-[500] text-[#031230]">
                        Hình thức thanh toán
                      </p>
                      <div className="mt-[12px] flex gap-[30px] justify-between">
                        <div className="flex items-center justify-center flex-col">
                          <span className="flex items-center justify-center text-center">
                            <BsCreditCard2FrontFill className="text-[20px] text-[#f66315]" />
                          </span>
                          <p className="text-[14px] text-[#444545]">
                            Chuyển khoản
                          </p>
                        </div>

                        <div className="flex items-center justify-center flex-col">
                          <span className="flex items-center justify-center text-center">
                            <FaMoneyBill className="text-[20px] text-[#f66315]" />
                          </span>
                          <p className="text-[14px] text-[#444545]">Tiền mặt</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex flex-row justify-between items-center gap-10">
                    <div>
                      <p className="text-[16px] font-[500] text-[#031230]">
                        Fanpage
                      </p>
                      <div className="flex gap-[10px] mt-[10px]">
                        <a href="/" className="no-underline">
                          <FaFacebook className="text-[20px] text-[#444545] hover:text-[#f66315]" />
                        </a>
                        <a href="/" className="no-underline">
                          <FaFacebookMessenger className="text-[20px] text-[#444545] hover:text-[#f66315]" />
                        </a>
                        <a href="/" className="no-underline">
                          <FaTiktok className="text-[20px] text-[#444545] hover:text-[#f66315]" />
                        </a>
                        <a href="/" className="no-underline">
                          <FaYoutube className="text-[20px] text-[#444545] hover:text-[#f66315]" />
                        </a>
                        <a href="/" className="no-underline">
                          <AiFillInstagram className="text-[20px] text-[#444545] hover:text-[#f66315]" />
                        </a>
                      </div>
                    </div>

                    <div className="max-md:mt-[48px]">
                      <p className="text-[16px] font-[500] text-[#031230]">
                        Danh sách ngân hàng
                      </p>
                      <div className="pt-5">
                        <div className="mx-auto list-none z-1">
                          <div className="flex flex-wrap">
                            <div className="w-[78px] mr-6 shrink-0 h-auto">
                              <img
                                src="https://fbshop.vn/wp-content/uploads/2024/01/icon-bank.webp"
                                alt=""
                                className="w-full h-auto max-w-full"
                              />
                            </div>
                            <div className="w-[78px] mr-6 shrink-0 h-auto">
                              <img
                                src="https://fbshop.vn/wp-content/uploads/2024/01/icon-bank-7.webp"
                                alt=""
                                className="w-full h-auto max-w-full"
                              />
                            </div>
                            <div className="w-[78px] mr-6 shrink-0 h-auto max-md:mt-3">
                              <img
                                src="https://fbshop.vn/wp-content/uploads/2024/01/icon-bank-6.webp"
                                alt=""
                                className="w-full h-auto max-w-full"
                              />
                            </div>
                            <div className="w-[78px] mr-6 shrink-0 h-auto max-md:mt-3">
                              <img
                                src="https://fbshop.vn/wp-content/uploads/2024/01/icon-bank-5.webp"
                                alt=""
                                className="w-full h-auto max-w-full"
                              />
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
        </div>
      </div>
      <div
        onClick={handleMessageSubmit}
        className="text-white cursor-pointer shadow-5px fixed bottom-[100px] right-[10px] z-999 top-auto w-[36px] h-[36px] rounded-[5px] bg-[#2167e9] no-underline"
      >
        <FaFacebookMessenger className="text-[24px] absolute block mt-[5px] ml-[6px] " />
      </div>
    </div>
  );
};

export default Footer;
