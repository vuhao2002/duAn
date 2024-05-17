import React from "react";
import { FaCheck, FaTimes, FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../Redux/Actions/wishlistActions";

const ProductCart = ({ product }) => {
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  let isStocking = true;
  const stars = [1, 2, 3, 4, 5];
  let percent = 0;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (product) {
    isStocking = product.stock > 0 ? true : false;
    percent = Math.round(
      ((product.discountPrice - product.originalPrice) /
        product.originalPrice) *
        100
    );
  }
  const handleAddToWishlist = () => {
    const newData = { ...product, qty: 1 };
    dispatch(addToWishlist(newData));
  };

  const handleRemoveToWishlist = () => {
    dispatch(removeFromWishlist(product));
  };

  return (
    <div className="px-[7px] w-[33.3333333%] max-[800px]:w-[50%]">
      {product ? (
        <>
          <div className="h-full">
            <div className="group flex flex-col h-full p-[10px] rounded-[12px] bg-[#fff] duration-300 ease-in-out hover:shadow-2">
              <div className="relative">
                <div className="relative pt-[100%] rounded-[12px] overflow-hidden">
                  <Link to={`/san-pham/${product._id}`}>
                    <img
                      className="group-hover:scale-105 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-37%] object-cover duration-300 ease-in-out object-top w-full h-auto max-w-full"
                      width="300"
                      height="400"
                      src={product?.images?.[0]?.url}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="absolute min-w-12 top-5 left-[10px] z-1 flex items-center justify-center">
                  <div className="absolute w-full min-h-[48px] top-[-10px] -z-1 left-[0px] bg-no-repeat bg-contain bg-sale"></div>
                  <div className="font-[700] text-[#fff] mt-[2px]">
                    {percent}%
                  </div>
                </div>
                {isStocking ? (
                  <div className="bg-[#dcf3d8] absolute py-1 px-4 min-w-[120px] flex items-center justify-center gap-[6px] rounded-[36px] bottom-[10px] left-[10px] text-[#1d9d06] text-[14px]">
                    <FaCheck />
                    <div className="font-[500]">Còn hàng</div>
                  </div>
                ) : (
                  <div className="bg-[#feefe8] absolute py-1 px-4 min-w-[120px] flex items-center justify-center gap-[6px] rounded-[36px] bottom-[10px] left-[10px] text-[#f63e15] text-[14px]">
                    <FaTimes />
                    <div className="font-[500]">Hết hàng</div>
                  </div>
                )}

                <div className="absolute flex items-center justify-center flex-col gap-2 bottom-[10px] right-[10px] duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                  {wishlistItems.some((wishlistItem) => {
                    return wishlistItem._id === product._id;
                  }) ? (
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-[50%] text-[#feefe8] bg-[#f66315] text-[16px] duration-300 ease-in-out cursor-pointer">
                      <FaRegHeart onClick={handleRemoveToWishlist} />
                    </div>
                  ) : (
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-[50%] text-[#f66315] bg-[#feefe8] text-[16px] duration-300 ease-in-out cursor-pointer">
                      <FaRegHeart onClick={handleAddToWishlist} />
                    </div>
                  )}
                  <div className="relative w-10 h-10 flex items-center justify-center rounded-[50%] text-[#f66315] bg-[#feefe8] hover:bg-[#f66315] hover:text-[#fff] text-[20px] duration-300 ease-in-out cursor-pointer">
                    <AiOutlineShoppingCart
                      onClick={() => {
                        navigate(`/san-pham/${product._id}`);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="flex items-center">
                  <div className="flex shrink-0">
                    <div className="relative h-3">
                      <div className="flex">
                        {stars.map((star) => {
                          if (star <= product?.ratings) {
                            return (
                              <img
                                src="https://fbshop.vn/template/assets/images/Star.svg"
                                alt=""
                                className="w-[14px] h-[14px] max-w-full ml-1"
                              />
                            );
                          } else {
                            return (
                              <img
                                src="https://fbshop.vn/template/assets/images/Star-fill.svg"
                                alt=""
                                className="w-[14px] h-[14px] max-w-full"
                              />
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <span className="text-[14px] mt-[2px] pl-[2px]">
                    {" "}
                    {product?.ratings}
                  </span>
                </div>
                <Link
                  to={`/san-pham/${product?._id}`}
                  className="text-[16px] font-[500] overflow-hidden line-clamp-2 text-ellipsis no-underline duration-300 hover:text-[#f66315] ease-in-out"
                >
                  {product?.name}{" "}
                </Link>
                <div className="flex items-center gap-[10px] pt-[10px] mt-auto">
                  <span className="text-[20px] md:text-[18px] text-[#f66315] font-[700]">
                    {product?.discountPrice} đ
                  </span>
                  <span className="text-[16px] md:text-[14px] text-[#7f8080] line-through">
                    {product?.originalPrice} đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductCart;
