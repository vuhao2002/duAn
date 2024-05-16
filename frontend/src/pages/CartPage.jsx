import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Consultation from "../components/Route/Consultation/Consultation";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineCreditScore } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaTruckFast } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Actions/cartActions";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let sum = 0;
  const dispatch = useDispatch();

  const handleMinusQty = (product) => {
    const qty = product?.qty - 1;
    const newData = { ...product, qty };
    dispatch(addToCart(newData));
  };

  const handleAddQty = (product) => {
    const qty = product?.qty + 1;
    const newData = { ...product, qty };
    dispatch(addToCart(newData));
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
                    <div className="bg-[#1d9d06] relative flex items-center justify-center w-[100px] h-[100px] rounded-[50%]">
                      <div className="border-[#1d9d06] absolute opacity-100 w-[120%] h-[120%] rounded-[50%] border-[2px] border-solid top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[10px]"></div>
                      <FaShoppingCart className="text-[32px] text-[#fff]" />
                      <div className="bg-[#1d9d06] absolute w-[78px] top-[50%] translate-y-[-50%] left-[132px] h-[2px]"></div>
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
        {cartItems ? (
          <div className="relative z-1 mt-[100px]">
            <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
              <div className="flex items-center justify-center gap-[10px]">
                <p className="text-[40px] font-[700] text-[#031230]">
                  Giỏ hàng
                </p>
                <div className="flex items-center justify-center py-[1px] px-[10px] rounded-[40px] font-[700] text-[#f66315] bg-[#feefe8]">
                  {cartItems.length}
                </div>
              </div>

              <div className="mt-[50px]">
                <form action="">
                  <div className="flex mx-[-25px]">
                    <div className="w-[50%] px-[25px]">
                      <div className="pr-[12px] max-h-[400px] flex flex-col gap-y-[30px] overflow-y-auto overflow-x-hidden">
                        {cartItems?.map((item, index) => {
                          sum += item?.qty * item?.discountPrice;
                          return (
                            <div className="flex gap-[12px]" key={index}>
                              <div className="w-[77px] h-[77px] shrink-0 rounded-[6px] overflow-hidden">
                                <img
                                  className="h-full object-cover max-w-[100%]"
                                  src={item?.images[0]?.url}
                                  alt=""
                                  width="300"
                                  height="372"
                                />
                              </div>
                              <div className="flex flex-col">
                                <a
                                  href="/san-pham/id"
                                  className="no-underline text-[16px]"
                                >
                                  {item?.name}
                                </a>
                                <div className="flex mt-auto">
                                  <div className="flex gap-[20px] p-[6px] rounded-[30px] border border-solid border-[#eee]">
                                    <div className="w-6 h-6 flex items-center justify-center cursor-pointer text-[#444545]">
                                      <FaMinus
                                        onClick={() => {
                                          if (item?.qty > 1) {
                                            handleMinusQty(item);
                                          }
                                        }}
                                        className="text-[14px]"
                                      />
                                    </div>
                                    <p className="text-[14px] text-[#031230]">
                                      {item?.qty}
                                    </p>
                                    <div className="w-6 h-6 flex items-center justify-center cursor-pointer text-[#444545]">
                                      <FaPlus
                                        onClick={() => {
                                          if (item?.qty < item?.stock) {
                                            handleAddQty(item);
                                          }
                                        }}
                                        className="text-[14px]"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-[16px] text-[#f66315] mt-auto ml-auto font-[700]">
                                <span>{item?.discountPrice}đ</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="w-[50%] px-[25px]">
                      <div className="bg-[#031230] py-[28px] px-[30px] relative">
                        <div className="absolute bottom-[100%] left-0 right-0 bg-[url('./images/ponut-bg.webp')] bg-no-repeat bg-cover h-[20px]"></div>
                        <p className="mb-[20px] text-[24px] font-[700] text-[#fff] duration-300 ease-in-out text-center">
                          Tóm tắt đơn hàng
                        </p>
                        <div className="pb-[30px] border-b-[1px] border-b-solid border-[#efefef]">
                          <div className="mb-[20px] flex gap-[4px] justify-between items-center">
                            <p className="text-[#fff]">Thành tiền</p>
                            <p className="text-[#f66315] font-[700]">{sum}đ</p>
                          </div>
                          <div className="mb-[20px] flex gap-[4px] justify-between items-center">
                            <p className="text-[#fff]">Vận chuyển</p>
                            <p className="text-[#fff] font-[700]">
                              Liên hệ phí vận chuyển sau
                            </p>
                          </div>
                        </div>
                        <div className="mt-[30px] flex items-center gap-[24px]">
                          <a href="/" className="w-full">
                            <div className="border border-solid border-[#f66315] w-full mx-auto min-w-[120px] rounded-[4rem] relative">
                              <div className="hover:text-[#fff] cursor-pointer relative hover:bg-[#f66315] bg-[#fff] text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                                <div className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]">
                                  <span className="text-[16px] font-[500] leading-[1.2]">
                                    Mua thêm sản phẩm
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a href="/thanh-toan" className="w-full">
                            <div className="border border-solid border-[#f66315] w-full mx-auto min-w-[120px] rounded-[4rem] relative">
                              <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                                <div className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]">
                                  <FaShoppingCart className="text-[16px]" />
                                  <span className="text-[16px] font-[500] leading-[1.2]">
                                    Thanh toán
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="absolute top-[100%] left-0 right-0 bg-[url('./images/ponut-bg.webp')] bg-no-repeat bg-cover h-[20px] scale-y-[-1]"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Consultation />
      <Footer />
    </div>
  );
};

export default CartPage;
