import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../Redux/Actions/productActions";

const BadmintonRacketsPage = () => {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const dispatch = useDispatch();

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeLimits, setActiveLimits] = useState(false);
  const [activeSoldOut, setActiveSoldOut] = useState(false);
  const [activeSortCreated, setActiveSortCreated] = useState(false);
  const [activeSortDiscount, setActiveSortDiscount] = useState(false);
  useEffect(() => {
    const keyword = "vot";
    dispatch(listProduct(keyword));
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleCheckboxChange = (value) => {
    setSelectedPriceRanges((prevSelectedPriceRanges) =>
      prevSelectedPriceRanges.includes(value)
        ? prevSelectedPriceRanges.filter((item) => item !== value)
        : [...prevSelectedPriceRanges, value]
    );
  };

  const filterProductsByPrice = (products) => {
    if (selectedBrand === "all") {
      return products.filter((product) => {
        if (selectedPriceRanges.length > 0) {
          const price = product.discountPrice;
          return selectedPriceRanges.some((range) => {
            switch (range) {
              case "1":
                return price >= 0 && price <= 2000000;
              case "2":
                return price > 2000000 && price <= 3000000;
              case "3":
                return price > 3000000 && price <= 5000000;
              case "4":
                return price > 5000000;
              default:
                return true;
            }
          });
        }
        return true;
      });
    } else {
      return products.filter((product) => {
        if (selectedPriceRanges.length > 0) {
          const price = product.discountPrice;
          return selectedPriceRanges.some((range) => {
            switch (range) {
              case "1":
                return (
                  price >= 0 &&
                  price <= 2000000 &&
                  product.name
                    .toLowerCase()
                    .includes(selectedBrand.toLowerCase())
                );
              case "2":
                return (
                  price > 2000000 &&
                  price <= 3000000 &&
                  product.name
                    .toLowerCase()
                    .includes(selectedBrand.toLowerCase())
                );
              case "3":
                return (
                  price > 3000000 &&
                  price <= 5000000 &&
                  product.name
                    .toLowerCase()
                    .includes(selectedBrand.toLowerCase())
                );
              case "4":
                return (
                  price > 5000000 &&
                  product.name
                    .toLowerCase()
                    .includes(selectedBrand.toLowerCase())
                );
              default:
                return true;
            }
          });
        }
        return product.name.toLowerCase().includes(selectedBrand.toLowerCase());
      });
    }
  };

  const submitFilter = (e) => {
    e.preventDefault();
    setActiveSoldOut(false);
    setActiveLimits(false);
    setActiveSortCreated(false);
    setActiveSortDiscount(false);
    setFilteredProducts(filterProductsByPrice(products));
  };

  const sortByLimited = () => {
    setActiveLimits(!activeLimits);
    if (!activeLimits) {
      setActiveSoldOut(false);
      setActiveSortCreated(false);
      setActiveSortDiscount(false);
      setFilteredProducts(
        [...filteredProducts].sort((a, b) => a.sold_out - b.sold_out)
      );
    } else {
      setFilteredProducts(filterProductsByPrice(products));
    }
  };

  const sortBySoldOut = () => {
    setActiveSoldOut(!activeSoldOut);
    if (!activeSoldOut) {
      setActiveLimits(false);
      setActiveSortCreated(false);
      setActiveSortDiscount(false);
      setFilteredProducts(
        [...filteredProducts].sort((a, b) => b.stock - a.stock)
      );
    } else {
      setFilteredProducts(filterProductsByPrice(products));
    }
  };

  const sortByCreated = () => {
    setActiveSortCreated(!activeSortCreated);
    if (activeSortCreated) {
      setFilteredProducts(
        [...filteredProducts].sort(
          (a, b) => new Date(b.createAt) - new Date(a.createAt)
        )
      );
    } else {
      setActiveSoldOut(false);
      setActiveLimits(false);
      setActiveSortDiscount(false);
      setFilteredProducts(filterProductsByPrice(products));
    }
  };

  const sortByDiscount = () => {
    setActiveSortDiscount(!activeSortDiscount);
    if (!activeSortDiscount) {
      setActiveSoldOut(false);
      setActiveLimits(false);
      setActiveSortCreated(false);
      setFilteredProducts(
        [...filteredProducts].sort(
          (a, b) =>
            Math.round(
              ((a.discountPrice - a.originalPrice) / a.originalPrice) * 100
            ) -
            ((b.discountPrice - b.originalPrice) / b.originalPrice) * 100
        )
      );
    } else {
      setFilteredProducts(filterProductsByPrice(products));
    }
  };

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
          <form onSubmit={submitFilter}>
            <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
              <div className="flex justify-between gap-[4px] items-center flex-wrap">
                <p className="text-[24px] font-[700]">Phân loại sản phẩm</p>
                <div className="flex items-center gap-[20px] flex-wrap">
                  <div
                    className="font-[700] text-[16px]"
                    onClick={sortByLimited}
                  >
                    {activeLimits ? (
                      <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px] bg-[#f66315] duration-300 ease-in-out">
                        <span className="w-[24px] h-[24px] flex-shrink-0">
                          <img src={folderIcon} alt="" />
                        </span>
                        <span className="text-[#fff]">Sản phẩm Limited</span>
                      </div>
                    ) : (
                      <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px]  bg-[#f5f5f5] duration-300 ease-in-out">
                        <span className="w-[24px] h-[24px] flex-shrink-0">
                          <img src={folderIcon} alt="" />
                        </span>
                        <span className="">Sản phẩm Limited</span>
                      </div>
                    )}
                  </div>

                  <div
                    className="font-[700] text-[16px] text-[#031230]"
                    onClick={sortBySoldOut}
                  >
                    {activeSoldOut ? (
                      <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px] bg-[#f66315] duration-300 ease-in-out">
                        <span className="w-[24px] h-[24px] flex-shrink-0">
                          <img src={hotIcon} alt="" />
                        </span>
                        <span className="text-[#fff]">Sản phẩm bán chạy</span>
                      </div>
                    ) : (
                      <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px]  bg-[#f5f5f5] duration-300 ease-in-out">
                        <span className="w-[24px] h-[24px] flex-shrink-0">
                          <img src={hotIcon} alt="" />
                        </span>
                        <span className="">Sản phẩm bán chạy</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="font-[700] text-[16px] text-[#031230]"
                    onClick={sortByCreated}
                  >
                    {activeSortCreated ? (
                      <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px] bg-[#f66315] duration-300 ease-in-out">
                        <span className="w-[24px] h-[24px] flex-shrink-0">
                          <img src={newIcon} alt="" />
                        </span>
                        <span className="text-[#fff]">Sản phẩm mới</span>
                      </div>
                    ) : (
                      <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px]  bg-[#f5f5f5] duration-300 ease-in-out">
                        <span className="w-[24px] h-[24px] flex-shrink-0">
                          <img src={newIcon} alt="" />
                        </span>
                        <span className="">Sản phẩm mới</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="font-[700] text-[16px] text-[#031230]"
                    onClick={sortByDiscount}
                  >
                    {activeSortDiscount ? (
                      <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px] bg-[#f66315] duration-300 ease-in-out">
                        <span className="w-[24px] h-[24px] flex-shrink-0">
                          <img src={tagIcon} alt="" />
                        </span>
                        <span className="text-[#fff]">Sản phẩm giảm giá</span>
                      </div>
                    ) : (
                      <div className="group flex cursor-pointer items-center gap-[10px] px-[28px] py-[16px] rounded-[45px]  bg-[#f5f5f5] duration-300 ease-in-out">
                        <span className="w-[24px] h-[24px] flex-shrink-0">
                          <img src={tagIcon} alt="" />
                        </span>
                        <span className="">Sản phẩm giảm giá</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-[50px] flex mx-[-40px]">
                <div className="w-[25%] px-[40px]">
                  <p className="text-[40px] font-[700] text-[#031230]">
                    Bộ lọc
                  </p>

                  <div className="flex flex-col max-h-[500px] mt-[16px] mb-[6px]">
                    {[
                      "Yonex",
                      "Lining",
                      "Victor",
                      "Mizuno",
                      "Kumpoo",
                      "all",
                    ].map((brand, index) => (
                      <div
                        className="flex items-center justify-between gap-[2px] cursor-pointer"
                        key={index}
                      >
                        <div className="flex items-center cursor-pointer">
                          <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                            <input
                              type="radio"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-[50%] border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                              id={brand}
                              name="brand"
                              value={brand}
                              checked={selectedBrand === brand}
                              onChange={(e) => setSelectedBrand(e.target.value)}
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </label>
                          <p className="ml-[8px] leading-[1.1] text-[#444545] capitalize">
                            {brand}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-b-[1px] border-b-solid border-[#ebebf0] mt-4">
                    <p className="text-[24px] font-[700] text-[#f66315] duration-300 ease-in-out">
                      Mức giá
                    </p>
                    <div className="flex flex-col max-h-[500px] mt-[16px] mb-[6px]">
                      {[
                        { label: "0 đến 2 triệu đồng", value: "1" },
                        { label: "2 triệu đến 3 triệu đồng", value: "2" },
                        { label: "3 triệu đến 5 triệu đồng", value: "3" },
                        { label: "Lớn hơn 5 triệu đồng", value: "4" },
                      ].map((priceRange) => (
                        <div
                          className="flex items-center justify-between gap-[2px] cursor-pointer"
                          key={priceRange.value}
                        >
                          <div className="flex items-center cursor-pointer">
                            <label
                              className="relative flex items-center p-3 rounded-full cursor-pointer"
                              htmlFor={priceRange.value}
                            >
                              <input
                                type="checkbox"
                                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                                id={priceRange.value}
                                value={priceRange.value}
                                onChange={() =>
                                  handleCheckboxChange(priceRange.value)
                                }
                              />
                              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="1"
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
                              {priceRange.label}
                            </p>
                          </div>
                        </div>
                      ))}
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
                {products ? (
                  <div className="w-[75%] px-[32px]">
                    <div className="font-[700] text-[40px]">
                      Tất cả sản phẩm
                    </div>
                    <div className="flex flex-wrap gap-y-[16px]">
                      {filteredProducts.map((product, index) => (
                        <ProductCard product={product} key={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
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

export default BadmintonRacketsPage;
