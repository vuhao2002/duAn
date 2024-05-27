import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import traleft from "../images/tra-left.webp";
import traright from "../images/tra-right.webp";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { getOrderDetails } from "../Redux/Actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchOrderPage = () => {
  const [search, setSearch] = useState("");
  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders } = orderListMy;

  const dispatch = useDispatch();
  console.log(search);

  const handleSearchOrder = (e) => {
    e.preventDefault();
    dispatch(getOrderDetails(search));
    setSearch("");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="font-Roboto">
      <Header />
      <div className="mt-[100px] mb-[150px] min-h-[68vh]">
        <div className="relative z-1 py-[100]">
          <div className="absolute left-[3%]">
            <img src={traleft} alt="" className="w-full h-auto" />
          </div>
          <div className="absolute left-[1%] top-[60px]">
            <img src={traleft} alt="" className="w-full h-auto" />
          </div>
          <div className="absolute right-[3%]">
            <img src={traright} alt="" className="w-full h-auto" />
          </div>
          <div className="absolute right-[1%] top-[60px]">
            <img src={traright} alt="" className="w-full h-auto" />
          </div>
        </div>
        <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
          <div className="flex justify-center items-center flex-col gap-[20px] text-center relative">
            <h2 className="text-[64px] font-[700] text-[#f66315]">Tra đơn</h2>
            <div className="text-[16px]">
              <p className="my-[10px] text-[#444545]">
                Để theo dõi đơn hàng của bạn xin vui lòng nhập ID đơn hàng của
                bạn vào ô dưới đây và nhấn nút “Tra đơn hàng”. <br /> ID đơn
                hàng đã được gửi cho bạn qua biên lai và qua email xác nhận mà
                bạn nhận được.
              </p>
            </div>
          </div>
          <div className="mt-[30px]">
            <form onSubmit={handleSearchOrder}>
              <div className="flex gap-[32px] w-[70%] mx-auto">
                <div className="shrink grow">
                  <label className="text-[16px] text-[#031230] font-[500] mb-[10px] block">
                    ID đơn hàng
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 139080"
                    className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="relative shrink-0 h-fit mt-auto text-[#fff] cursor-pointer overflow-hidden duration-300 ease-in-out border border-solid border-[#f66215] bg-[#f66315] hover:bg-[#fff] hover:text-[#000] w-fit mx-auto rounded-[40px] items-center justify-center"
                >
                  <span className="flex items-center justify-center py-[8px] px-[20px] gap-[6px] font-[700]">
                    <FaSearch className="text-[16px]" />
                    <span>Tra đơn hàng</span>
                  </span>
                </button>
              </div>
            </form>
          </div>
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
                      <tr>
                        <td className="py-[23px]">#{order._id}</td>
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
                          {order.status === "Refund Success" && (
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
      <Footer />
    </div>
  );
};

export default SearchOrderPage;
