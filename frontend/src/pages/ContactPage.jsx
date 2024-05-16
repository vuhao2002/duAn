import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa6";
const ContactPage = () => {
  return (
    <div className="font-Roboto">
      <Header />
      <div>
        <div className="bg-[#fff] mt-[58px]">
          <div className="relative">
            <div className="relative pt-[36%]">
              <div className="absolute left-0 top-0 right-0 bottom-0 z-1">
                <img
                  className="w-full h-full max-w-full"
                  src="https://static.vecteezy.com/system/resources/previews/006/614/441/non_2x/cream-white-badminton-shuttlecock-and-racket-with-neon-light-shading-on-green-floor-in-indoor-badminton-court-blurred-badminton-background-copy-space-free-photo.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="bottom-[30%] left-[8%] z-1 text-center absolute">
              <div className="font-[700] lg:text-[64px] md:text-[48px] sm:text-[36px] text-[24px] text-[#fff]">
                <h1>LIÊN HỆ</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="my-[100px]">
          <div className="max-w-[1230px] w-full h-full mx-auto px-[15px]">
            <div className="rounded-[12px] overflow-hidden shadow-4">
              <div className="flex">
                <div className="w-[33.3333333%] max-[930px]:w-full">
                  <div className="h-full">
                    <div className="h-full py-[40px] px-[60px] min-[930px]:py-[100px] max-[1200px]:py-[24px] max-[1200px]:px-[16px] max-[930px]:flex-row max-[930px]:flex-wrap max-[930px]:gap-[12px] max-[930px]:mx-[-12px] flex flex-col justify-center bg-[#f66315]">
                      <div className="mb-[30px]">
                        <div className="flex items-center gap-[34px]">
                          <div className="w-[32px] h-[32px] relative">
                            <div className="absolute h-[40px] w-[2px] bg-[#e99164] opacity-50 top-[0] left-[130%]"></div>
                            <FiPhoneCall className="text-[20px] text-[#fef3eb] text-center mt-[8px]" />
                          </div>
                          <div>
                            <p className="text-[16px] font-[700] text-[#fff] ">
                              Tư vấn và CSKH
                            </p>
                            <p className="text-[16px] text-[#fff] hover:text-[#000] duration-300 ease-in-out">
                              0369.223.450
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-[30px]">
                        <div className="flex items-center gap-[34px]">
                          <div className="w-[32px] h-[32px] relative">
                            <div className="absolute h-[40px] w-[2px] bg-[#e99164] opacity-50 top-[0] left-[130%]"></div>
                            <FiPhoneCall className="text-[20px] text-[#fef3eb] text-center mt-[8px]" />
                          </div>
                          <div>
                            <p className="text-[16px] font-[700] text-[#fff] ">
                              Hàn vợt cacbon
                            </p>
                            <p className="text-[16px] text-[#fff] hover:text-[#000] duration-300 ease-in-out">
                              0866.246.466
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-[30px]">
                        <div className="flex items-center gap-[34px]">
                          <div className="w-[32px] h-[32px] relative">
                            <div className="absolute h-[40px] w-[2px] bg-[#e99164] opacity-50 top-[0] left-[130%]"></div>
                            <MdOutlineMail className="text-[20px] text-[#fef3eb] text-center mt-[8px]" />
                          </div>
                          <div>
                            <p className="text-[16px] font-[700] text-[#fff] ">
                              Email liên hệ
                            </p>
                            <p className="text-[16px] text-[#fff] hover:text-[#000] duration-300 ease-in-out">
                              badmintonshop@gmail.com
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-[30px]">
                        <div className="flex items-center gap-[34px]">
                          <div className="w-[32px] h-[32px] relative">
                            <div className="absolute h-[40px] w-[2px] bg-[#e99164] opacity-50 top-[0] left-[130%]"></div>
                            <IoLocationOutline className="text-[20px] text-[#fef3eb] text-center mt-[8px]" />
                          </div>
                          <div>
                            <p className="text-[16px] font-[700] text-[#fff] ">
                              Xem hệ thống cửa hàng
                            </p>
                            <a
                              href="/cua-hang"
                              className="text-[16px] text-[#fff] hover:text-[#000] duration-300 ease-in-out no-underline"
                            >
                              Tại Hà Nội và Thành phố Hồ Chí Minh
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[66.6666667%] max-[930px]:w-full">
                  <div className="h-full">
                    <div className="h-full p-[24px] bg-[#fff]">
                      <h2 className="mb-[24px] text-[24px] font-[700]">
                        Gửi tin nhắn cho BadmintonShop
                      </h2>
                      <div>
                        <form action="" className="relative">
                          <div className="flex mx-[-12px] flex-wrap  justify-between">
                            <div className="w-[50%] px-3">
                              <label className="text-[16px] text-[#031230] font-[500] mb-[10px] block">
                                Họ và tên{" "}
                                <span className="text-[#f66315]">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Nhập họ tên của bạn"
                                className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[21px] text-[#031230] ring-[#ccc]  outline-none ring-1 focus:ring-[#f66315]"
                              />
                            </div>
                            <div className="w-[50%] px-3">
                              <label className="text-[16px] text-[#031230] font-[500] mb-[10px] block">
                                Email <span className="text-[#f66315]">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Nhập email của bạn"
                                className="w-full text-[14px] font-[400] border-none h-[42px] px-[20px] rounded-[21px] text-[#031230] ring-[#ccc]  outline-none ring-1 focus:ring-[#f66315]"
                              />
                            </div>
                            <div className="w-[100%] px-3 mt-[20px]">
                              <label className="text-[16px] text-[#031230] font-[500] mb-[10px] block">
                                Nội dung tin nhắn{" "}
                                <span className="text-[#f66315]">*</span>
                              </label>
                              <textarea
                                type="text"
                                placeholder="Viết đánh giá"
                                cols="40"
                                rows="10"
                                className="w-full text-[14px] font-[400] border-none min-h-[84px] px-[20px] py-[10px] rounded-[12px] text-[#031230] ring-[#ccc]  outline-none ring-1 focus:ring-[#f66315]"
                              ></textarea>
                            </div>
                          </div>
                          <div className="flex justify-end  mt-[30px]">
                            <div className="border border-solid border-[#f66315] w-fit mx-auto min-w-[120px] rounded-[4rem] relative">
                              <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                                <div className="py-[10px] px-[40px] flex items-center justify-center gap-[6px]">
                                  <FaPaperPlane className="text-[16px]" />
                                  <span className="text-[16px] font-[500] leading-[1.2]">
                                    Gửi đi
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
