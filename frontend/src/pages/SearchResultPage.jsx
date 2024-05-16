import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { IoIosSearch } from "react-icons/io";
import ProductCard from "../components/Route/ProductCard/ProductCard";

const SearchResultPage = () => {
  return (
    <div className="font-Roboto">
      <Header />
      <div className="my-[100px]">
        <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
          <div className="flex justify-between flex-wrap items-end gap-[12px]">
            <div>
              <h2 className="text-[40px] font-[700] text-[#031230]">
                Kết quả tìm kiếm
              </h2>
              <div className="text-[21px] mt-5 font-[400] italic">
                Có <span> 1 </span> kết quả tìm kiếm cho từ khóa "
                <span>Victor A391</span>"
              </div>
            </div>
            <div className="flex rounded-[54px] border-[1px] border-solid border-[#c9c9c9] pl-[20px]">
              <div className="flex shrink grow mx-[-12px] items-center">
                <div className="flex px-3 shrink grow">
                  <input
                    type="search"
                    className="w-full px-[12px] border-none text-[14px] focus:outline-none  focus:ring-0 "
                    placeholder="Nhập từ khóa"
                  />
                </div>
              </div>
              <a href="/ket-qua-tim-kiem">
                <button
                  type="submit"
                  className="text-[#fff] text-[16px] hover:text-[#000] hover:bg-[#fff] font-[700] cursor-pointer relative duration-300 ease-in-out bg-[#f66315] w-fit mx-auto rounded-[40px] flex items-center justify-center border border-solid border-[#f66315]"
                >
                  <div className="flex items-center justify-center px-[20px] py-[10px] gap-[6px]">
                    <IoIosSearch className="text-[18px]" />
                    <span>Tìm kiếm</span>
                  </div>
                </button>
              </a>
            </div>
          </div>
          <div className="mt-[100px] my-[200px]">
            <div className="w-[75%] flex flex-wrap mx-auto">
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
      <Footer />
    </div>
  );
};

export default SearchResultPage;
