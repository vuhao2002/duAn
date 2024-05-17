import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Consultation from "../components/Route/Consultation/Consultation";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";

const ShopsPage = () => {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    const getApiProductCard = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/shop`);
      setStores(data);
    };
    getApiProductCard();
  }, []);
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
                <h1>HỆ THỐNG CỬA HÀNG</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-1 my-[100px]">
          <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
            <div className="flex mx-[-20px]">
              <div className="w-[50%] px-[20px]">
                <div className="h-full relative">
                  <img
                    src="https://cdn.shopify.com/s/files/1/2355/9379/files/NW_Badminton_Tennis-1_480x480.jpg?v=1676730551"
                    className="w-full h-auto max-w-full"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-[50%] px-[20px]">
                <div className="pr-[30px] max-h-[570px] overflow-y-auto">
                  {/* options */}
                  {stores?.length > 0 ? (
                    <div className="mb-[30px]">
                      {stores.map((store, i) => {
                        return (
                          <div
                            className="hover:bg-[#fff] bg-[#feefe8] p-[15px] rounded-[12px] border border-solid border-[#f66315] duration-300 ease-in-out cursor-pointer margin-left margin-right mb-4"
                            key={i}
                          >
                            <div className="flex items-center justify-between gap-[12px]">
                              <span className="text-[24px] font-[700] text-[#f66315] duration-300">
                                BadmintonShop Tây Hồ
                              </span>
                              <a href="https://maps.google.com/">
                                <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] hover:border hover:border-solid hover:border-[#f66315] rounded-[4rem] items-center justify-center flex">
                                  <div className="py-[8px] px-[10px] flex items-center justify-center gap-[6px]">
                                    <FaMapMarkerAlt className="text-[16px]" />
                                    <span className="text-[16px] font-[500] leading-[1.2]">
                                      Xem bản đồ
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="flex flex-col gap-[10px] mt-[12px]">
                              <div className="flex gap-[10px] text-[16px] text-[#444545]">
                                <FaPhone className="text-[12px] mt-[6px]" />
                                <div className="flex flex-col">
                                  <p className="font-[700]">Hotline</p>
                                  <p>{store.phoneNumber}</p>
                                </div>
                              </div>
                              <div className="flex gap-[10px] text-[16px] text-[#444545]">
                                <FaMapMarkerAlt className="text-[12px] mt-[6px]" />
                                <div className="flex flex-col">
                                  <p className="font-[700]">Địa chỉ</p>
                                  <p>{store.address} </p>
                                </div>
                              </div>
                              <div className="flex gap-[10px] text-[16px] text-[#444545]">
                                <MdEmail className="text-[12px] mt-[6px]" />
                                <div className="flex flex-col">
                                  <p className="font-[700]">Email</p>
                                  <p>{store.email}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Consultation />
      <Footer />
    </div>
  );
};

export default ShopsPage;
