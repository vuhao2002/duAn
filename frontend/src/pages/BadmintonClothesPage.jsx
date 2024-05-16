import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Consultation from "../components/Route/Consultation/Consultation";
import { Link } from "react-router-dom";
import banner2 from "../images/banner-2.webp";
import folderIcon from "../images/icon-folder.webp";
import hotIcon from "../images/icon-cate-hot.webp";
import newIcon from "../images/icon-cate-new.webp";
import tagIcon from "../images/icon-cate-tag.webp";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { IoFilter } from "react-icons/io5";

const BadmintonClothesPage = () => {
  return (
    <div className="font-Roboto">
      <Header />
      <div className="mt-[58px] bg-[#fff] min-h-[68vh] mb-[40px]">
        <div className="relative mb-8 mt-[58px] sm:mb-10 md:mb-12 lg:mb-16 group">
          <Link to="/san-pham">
            <img
              src={banner2}
              alt="banner2"
              className="w-full h-auto bg-center bg-cover duration-500"
            />
          </Link>
        </div>
        <div className="mt-6">
          <form action="">
            <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
              <div className="flex justify-between gap-[4px] items-center flex-wrap">
                <p className="text-[24px] font-[700]">Phân loại sản phẩm</p>
                <div className="flex items-center gap-[20px] flex-wrap">
                  <div className="font-[700] text-[16px] text-[#031230]">
                    <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px] hover:bg-[#f66315] bg-[#f5f5f5] duration-300 ease-in-out">
                      <span className="w-[24px] h-[24px] flex-shrink-0">
                        <img src={folderIcon} alt="" />
                      </span>
                      <span className="group-hover:text-[#fff]">
                        Sản phẩm Limited
                      </span>
                    </div>
                  </div>
                  <div className="font-[700] text-[16px] text-[#031230]">
                    <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px] hover:bg-[#f66315] bg-[#f5f5f5] duration-300 ease-in-out">
                      <span className="w-[24px] h-[24px] flex-shrink-0">
                        <img src={hotIcon} alt="" />
                      </span>
                      <span className="group-hover:text-[#fff]">
                        Sản phẩm bán chạy
                      </span>
                    </div>
                  </div>
                  <div className="font-[700] text-[16px] text-[#031230]">
                    <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px] hover:bg-[#f66315] bg-[#f5f5f5] duration-300 ease-in-out">
                      <span className="w-[24px] h-[24px] flex-shrink-0">
                        <img src={newIcon} alt="" />
                      </span>
                      <span className="group-hover:text-[#fff]">
                        Sản phẩm mới
                      </span>
                    </div>
                  </div>
                  <div className="font-[700] text-[16px] text-[#031230]">
                    <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px] hover:bg-[#f66315] bg-[#f5f5f5] duration-300 ease-in-out">
                      <span className="w-[24px] h-[24px] flex-shrink-0">
                        <img src={tagIcon} alt="" />
                      </span>
                      <span className="group-hover:text-[#fff]">
                        Sản phẩm giảm giá
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[50px] flex mx-[-40px]">
                <div className="w-[25%] px-[40px]">
                  <p className="text-[40px] font-[700] text-[#031230]">
                    Bộ lọc
                  </p>
                  <div className="border-b-[1px] border-b-solid border-[#ebebf0] mt-4">
                    <p className="text-[24px] font-[700] text-[#f66315] duration-300 ease-in-out">
                      Thương hiệu
                    </p>
                    <div className="flex flex-col max-h-[500px] mt-[16px] mb-[6px]">
                      <div className="flex items-center justify-between gap-[2px] cursor-pointer">
                        <div className="flex items-center cursor-pointer">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="red"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id="red"
                              value="yonex"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545]">
                            Yonex
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[2px] cursor-pointer">
                        <div className="flex items-center cursor-pointer">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="red"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id="red"
                              value="lining"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545]">
                            Lining
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[2px] cursor-pointer">
                        <div className="flex items-center cursor-pointer">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="red"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id="red"
                              value="victor"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545]">
                            Victor
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[2px] cursor-pointer">
                        <div className="flex items-center cursor-pointer">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="red"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id="red"
                              value="mizuno"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545]">
                            Mizuno
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[2px] cursor-pointer">
                        <div className="flex items-center cursor-pointer">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="red"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id="red"
                              value="kumpoo"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545]">
                            Kumpoo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b-[1px] border-b-solid border-[#ebebf0] mt-4">
                    <p className="text-[24px] font-[700] text-[#f66315] duration-300 ease-in-out">
                      Mức giá
                    </p>
                    <div className="flex flex-col max-h-[500px] mt-[16px] mb-[6px]">
                      <div className="flex items-center justify-between gap-[2px] cursor-pointer">
                        <div className="flex items-center cursor-pointer">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="red"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id="red"
                              value="1"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545]">
                            0 đến 500 nghìn đồng
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[2px] cursor-pointer">
                        <div className="flex items-center cursor-pointer">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="red"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id="red"
                              value="2"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545]">
                            500 nghìn đến 1 triệu đồng
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[2px] cursor-pointer">
                        <div className="flex items-center cursor-pointer">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="red"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id="red"
                              value="3"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545]">
                            1 triệu đến 2 triệu đồng
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[2px] cursor-pointer">
                        <div className="flex items-center cursor-pointer">
                          <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="red"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id="red"
                              value="4"
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545]">
                            Lớn hơn 2 triệu đồng
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="relative shrink-0 h-fit mt-[20px] text-[#fff] cursor-pointer overflow-hidden duration-300 ease-in-out border border-solid border-[#f66215] bg-[#f66315] hover:bg-[#fff] hover:text-[#000] w-full mx-auto rounded-[40px] items-center justify-center"
                    >
                      <span className="flex items-center justify-center py-[8px] px-[20px] gap-[6px] font-[700]">
                        <IoFilter className="text-[16px]" />
                        <span>Áp dụng</span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="w-[75%] px-[32px]">
                  <div className="font-[700] text-[40px]">Tất cả sản phẩm</div>
                  <div className="flex flex-wrap ">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Consultation />
      <Footer />
    </div>
  );
};

export default BadmintonClothesPage;
