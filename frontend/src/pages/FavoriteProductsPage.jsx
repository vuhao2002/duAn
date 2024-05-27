import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../Redux/Actions/wishlistActions";
import { useNavigate } from "react-router-dom";

const FavoriteProductsPage = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRemoveToWishlist = (product) => {
    dispatch(removeFromWishlist(product));
  };
  const handleToDetailProduct = (id) => {
    navigate(`/san-pham/${id}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="font-Roboto">
      <Header />
      <div className="mt-[100px] mb-[150px] min-h-[68vh]">
        <div className="pt-[50px] relative">
          <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
            <div className="relative z-1">
              <p className="text-center text-[40px] font-[700] text-[#031230]">
                Sản phẩm yêu thích
              </p>
              <div className="mt-[50px]">
                <table className="w-full border-collapse border-spacing-0">
                  <thead>
                    <tr>
                      <th className="w-[40%] text-[#f66315] font-[700] pb-5 border-b border-b-solid border-b-[#efefef] text-left">
                        Sản phẩm
                      </th>
                      <th className="text-[#f66315] font-[700] pb-5 border-b border-b-solid border-b-[#efefef] text-center">
                        Đơn giá
                      </th>
                      <th className="text-[#f66315] font-[700] pb-5 border-b border-b-solid border-b-[#efefef] text-center">
                        Tình trạng
                      </th>
                      <th className="text-[#f66315] font-[700] pb-5 border-b border-b-solid border-b-[#efefef] text-center">
                        Chức năng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems &&
                      wishlistItems.map((wishlistItem, index) => {
                        return (
                          <tr
                            className="border-b border-b-solid border-b-[#efefef]"
                            key={index}
                          >
                            <td className="py-5 text-center relative align-middle">
                              <div className="flex items-center gap-[20px]">
                                <div className="shrink-0 w-[102px] h-[102px] rounded-[6px] overflow-hidden">
                                  <img
                                    src={wishlistItem?.images?.[0]?.url}
                                    alt=""
                                    className="w-full object-cover max-w-full h-auto"
                                  />
                                </div>
                                <p className="text-[16px] font-[500]">
                                  {wishlistItem?.name}
                                </p>
                              </div>
                            </td>
                            <td className="py-5 text-center relative align-middle">
                              <p className="font-[700] text-[#f63e15]">
                                {wishlistItem?.discountPrice} đ
                              </p>
                            </td>
                            <td className="py-5 text-center relative align-middle">
                              {wishlistItem?.stock > 0 ? (
                                <div className="text-[#1d9d06] bg-[#dcf3d8] flex justify-center items-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit mx-auto">
                                  Còn hàng
                                </div>
                              ) : (
                                <div className="text-[#f63e15] bg-[#ffded6] flex justify-center items-center py-1 px-4 rounded-[37px] font-[500] min-w-[126px] w-fit mx-auto">
                                  Hết hàng
                                </div>
                              )}
                            </td>
                            <td className="py-5 text-center relative align-middle">
                              <div className="flex justify-center items-center gap-[6px]">
                                <button
                                  onClick={() => {
                                    handleToDetailProduct(wishlistItem._id);
                                  }}
                                  className="flex items-center justify-center py-[16px] gap-[6px]"
                                >
                                  <div className="border border-solid border-[#f66315] w-full mx-auto min-w-[120px] rounded-[4rem] relative">
                                    <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                                      <div className="py-[12px] px-[16px] flex items-center justify-center gap-[6px]">
                                        <FaShoppingCart className="text-[16px]" />
                                        <span className="text-[16px] font-[500] leading-[1.2]">
                                          Chi tiết sản phẩm
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </button>

                                <div className="w-[44px] h-[44px] rounded-[50%] flex items-center justify-center bg-[#ffded6] duration-300 ease-in-out cursor-pointer hover:bg-[#e10600] hover:text-[#fff] text-[#e10600]">
                                  <RiDeleteBin5Line
                                    onClick={() => {
                                      handleRemoveToWishlist(wishlistItem);
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoriteProductsPage;
