import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { FaCartShopping, FaPaperPlane } from "react-icons/fa6";
import { FaCheck, FaTimes, FaRegHeart, FaMinus, FaPlus } from "react-icons/fa";
import productDecor from "../../images/pd_decor.webp";
import icon_hot from "../../images/icon-cate-hot.webp";
import icon_new from "../../images/icon-cate-new.webp";
import icon_tag from "../../images/icon-cate-tag.webp";
import ft_pay_icon from "../../images/ft-pay-icon.webp";
import step_icon from "../../images/step-icon.webp";
import cart_icon from "../../images/cart-icon.webp";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Actions/cartActions";
import { Link, useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Redux/Actions/wishlistActions";
import {
  createProductReview,
  listProduct,
} from "../../Redux/Actions/productActions";

const ProductDetails = () => {
  const [select, setSelect] = useState(0);
  const [active, setActive] = useState(1);
  const [rating, setRating] = useState(0); // State để lưu trữ số sao đánh
  const [comment, setComment] = useState("");
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productCheckUserBuy = useSelector((state) => state.productCheckUserBuy);
  const { success } = productCheckUserBuy;
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let isStocking = true;
  let images = [];
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const stars = [1, 2, 3, 4, 5];
  let percent = 0;
  if (product && loading === false) {
    isStocking = product.stock > 0;
    images = product?.images?.map((item) => {
      return item.url;
    });
    percent = Math.round(
      ((product.discountPrice - product.originalPrice) /
        product.originalPrice) *
        100
    );
  }

  const handleStarClick = (starIndex) => {
    // Khi click vào một sao, cập nhật giá trị rating thành index của sao + 1
    setRating(starIndex + 1);
  };

  const handleAddToCart = (product) => {
    let newData = { ...product, qty };
    if (color !== null) {
      newData = { ...newData, color };
    }
    if (size !== null) {
      newData = { ...newData, size };
    }
    if (size === null && color === null) {
      return;
    }
    dispatch(addToCart(newData));
  };

  const handleAddToWishlist = () => {
    const newData = { ...product, qty: 1 };
    dispatch(addToWishlist(newData));
  };

  const handleRemoveToWishlist = () => {
    dispatch(removeFromWishlist(product));
  };
  const handleCreateReview = () => {
    if (comment !== "" && product) {
      const productId = product._id;
      console.log(rating, comment, productId);
      dispatch(createProductReview(rating, comment, productId));
    }
  };

  useEffect(() => {
    dispatch(listProduct(product.category));
  }, [product, dispatch]);

  return (
    <div className="my-[100px] ">
      {product && loading === false ? (
        <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
          <div className="flex mx-[-12px] flex-wrap">
            {/* left */}
            <div className="w-[41.6666667%] px-[12px] max-[850px]:w-full">
              <div>
                <div className="relative">
                  <div className="mx-auto relative overflow-hidden z-1">
                    <div className="w-full relative max-[850px]:w-[65%] max-[600px]:w-full mx-auto cursor-pointer duration-300 ease-in-out">
                      <img
                        className="w-full h-full object-cover max-w-full rounded-[5px]"
                        src={images[select]}
                        alt=""
                      />
                      <div className="flex absolute min-w-[48px] top-[20px] left-[10px] z-1 items-center justify-center">
                        <div className="absolute w-full min-h-[48px] top-[-10px] -z-1 left-[0px] bg-no-repeat bg-contain bg-sale"></div>
                        <div className="font-[700] text-[#fff] mt-[2px]">
                          {percent}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[12px]">
                  <div className="w-full flex justify-center">
                    {images &&
                      images.map((i, index) => (
                        <div
                          key={index}
                          className={`w-[100px] mr-[10px] border border-solid cursor-pointer bg-[#fff] h-full ${
                            select === index
                              ? "border-[#f66315]"
                              : "border-[#ebebeb]"
                          }`}
                        >
                          <div className={`pb-[100%] h-0 relative`}>
                            <img
                              src={`${i}`}
                              alt=""
                              height="80"
                              width="80"
                              onClick={() => setSelect(index)}
                              className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-full max-h-full w-auto h-auto"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* tình trạng */}
              <div className="mt-[20px]">
                <div className="flex justify-between gap-2">
                  <div className="mb-0"></div>
                  {isStocking ? (
                    <div className="bg-[#dcf3d8] py-1 px-4 min-w-[120px] flex items-center justify-center gap-[6px] rounded-[36px] text-[#1d9d06] text-[14px]">
                      <FaCheck />
                      <div className="font-[500]">Còn hàng</div>
                    </div>
                  ) : (
                    <div className="bg-[#feefe8] py-1 px-4 min-w-[120px] flex items-center justify-center gap-[6px] rounded-[36px] text-[#f63e15] text-[14px]">
                      <FaTimes />
                      <div className="font-[500]">Hết hàng</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* right */}
            <div className="w-[58.3333333%] px-[12px] max-[850px]:w-full">
              <div>
                <div className="flex gap-2 items-center justify-between">
                  <h1 className="max-[1200px]:text-[35px] text-[40px] font-[700] text-[#031230]">
                    {product?.name}
                  </h1>
                </div>
                <div className="flex gap-[28px]">
                  <div className="flex items-center gap-1">
                    <span className="font-[700] text-[#f6af15]">
                      {product?.ratings}
                    </span>
                    <div className="flex">
                      {stars.map((star) => {
                        if (star <= product?.ratings) {
                          return (
                            <img
                              src="https://fbshop.vn/template/assets/images/Star.svg"
                              alt=""
                              className="w-[18px] h-[18px] max-w-full"
                            />
                          );
                        } else {
                          return (
                            <img
                              src="https://fbshop.vn/template/assets/images/Star-fill.svg"
                              alt=""
                              className="w-[18px] h-[18px] max-w-full"
                            />
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 relative">
                    <div className="absolute h-4 w-[1px] bg-[#000] top-[50%] left-[-1rem] translate-x-[-50%] translate-y-[-50%]"></div>
                    <span className="font-[700]">{product.reviews.length}</span>
                    <span className="text-[14px] mt-[1px]"> đánh giá</span>
                  </div>
                  <div className="flex items-center gap-1 relative">
                    <div className="absolute h-4 w-[1px] bg-[#000] top-[50%] left-[-1rem] translate-x-[-50%] translate-y-[-50%]"></div>
                    <span className="font-[700]">{product?.sold_out}</span>
                    <span className="text-[14px] mt-[1px]"> lượt mua</span>
                  </div>
                  {wishlistItems.some((wishlistItem) => {
                    return wishlistItem._id === product._id;
                  }) ? (
                    <div className="w-[30px] h-[30px] relative rounded-[50%] flex items-center justify-center text-[#feefe8] bg-[#f66315] text-[13px] duration-300 cursor-pointer">
                      <FaRegHeart onClick={handleRemoveToWishlist} />
                    </div>
                  ) : (
                    <div className="w-[30px] h-[30px] relative rounded-[50%] flex items-center justify-center text-[#f66315] bg-[#feefe8] text-[13px] duration-300 cursor-pointer ">
                      <FaRegHeart onClick={handleAddToWishlist} />
                    </div>
                  )}
                </div>
                <div className="mt-[10px]">
                  <div className="flex gap-[20px] items-center">
                    <div className="leading-[1] flex items-center gap-[10px] p-1">
                      <span className="max-[1200px]:text-[29px] font-[700] text-[#f66315] text-[34px]">
                        {product?.discountPrice}đ
                      </span>
                      <span className="text-[#7f8080] line-through">
                        {product?.originalPrice}đ
                      </span>
                    </div>
                  </div>
                  <div className="mt-0">
                    <span className="inline-block text-[#f66315]">
                      Chọn thuộc tính:
                    </span>
                    {product?.colors.length > 0 ? (
                      <div className="mt-[20px]">
                        <div className="flex items-center gap-3">
                          <span className="min-w-[80px] font-[500]">
                            Màu sắc
                          </span>
                          <div className="flex mx-[-8px] flex-wrap">
                            {product?.colors.map((c, i) => {
                              return (
                                <button
                                  onClick={() => {
                                    setColor(c);
                                  }}
                                  className="px-[5px]"
                                  key={i}
                                >
                                  {color === c ? (
                                    <div className="min-w-[32px] h-[32px] rounded-[6px] border-[2px] border-solid border-[#fbc1a1] flex items-center justify-center font-[500] duration-300 ease-in-out text-[#fff] bg-[#f63e15] cursor-pointer flex-col gap-[6px]">
                                      <span className="p-[7px] text-[#fff] text-[14px] duration-300 ease-in-out">
                                        {c}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="min-w-[32px] h-[32px] rounded-[6px] border-[2px] border-solid border-[#fbc1a1] flex items-center justify-center font-[500] duration-300 ease-in-out text-[#444545] cursor-pointer flex-col gap-[6px]">
                                      <span className="p-[7px] text-[#031230] text-[14px] duration-300 ease-in-out">
                                        {c}
                                      </span>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* Nếu mà giày có kích cớ / áo*/}
                    {product?.category === "giay" &&
                    product?.size.length > 0 ? (
                      <div className="mt-[20px]">
                        <div className="flex items-center gap-3">
                          <span className="min-w-[80px] font-[500]">
                            Size giày
                          </span>
                          <div className="flex mx-[-8px] flex-wrap">
                            {product?.size.map((s, index) => {
                              return (
                                <button
                                  onClick={() => {
                                    setSize(s);
                                  }}
                                  className="px-[5px]"
                                  key={index}
                                >
                                  {size === s ? (
                                    <div className="min-w-[32px] h-[32px] rounded-[6px] border-[2px] border-solid border-[#fbc1a1] flex bg-[#f63e15] items-center justify-center font-[500] duration-300 ease-in-out text-[#fff] cursor-pointer flex-col gap-[6px]">
                                      <span className="p-[7px] text-[#fff] text-[14px] duration-300 ease-in-out">
                                        {s}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="min-w-[32px] h-[32px] rounded-[6px] border-[2px] border-solid border-[#fbc1a1] flex items-center justify-center font-[500] duration-300 ease-in-out text-[#444545] cursor-pointer flex-col gap-[6px]">
                                      <span className="p-[7px] text-[#031230] text-[14px] duration-300 ease-in-out">
                                        {s}
                                      </span>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="mt-[20px] flex items-center gap-[30px]">
                    <div className="flex items-center gap-[10px]">
                      <span className="min-w-[80px] font-[500]">Số lượng:</span>
                      <div className="flex mt-auto">
                        <div className="flex gap-[20px] p-[6px] rounded-[30px] border border-solid border-[#eee]">
                          <div className="w-6 h-6 flex items-center justify-center cursor-pointer text-[#444545]">
                            <FaMinus
                              onClick={() => {
                                if (qty > 1) {
                                  setQty(qty - 1);
                                }
                              }}
                              className="text-[14px]"
                            />
                          </div>
                          <p className="text-[14px] text-[#031230]">{qty}</p>
                          <div className="w-6 h-6 flex items-center justify-center cursor-pointer text-[#444545]">
                            <FaPlus
                              onClick={() => {
                                if (qty < product?.stock) {
                                  setQty(qty + 1);
                                }
                              }}
                              className="text-[14px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[20px] pr-[20px] flex gap-[10px]">
                    <div
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                      className="bg-[#fff] hover:bg-[#f66315] text-[#031230]  hover:text-[white] border border-solid border-[#f66315] min-w-[180px] cursor-pointer relative overflow-hidden transition-all my-0  rounded-[40px] flex items-center justify-center"
                    >
                      <span className="flex items-center justify-center py-[10px] px-[20px]">
                        <span className="leading-[1.2] text-[16px] font-[700] ">
                          Thêm vào giỏ
                        </span>
                      </span>
                    </div>

                    <div
                      onClick={() => {
                        handleAddToCart(product);
                        if (size === null && color === null) {
                          return;
                        }
                        if (!userInfo) {
                          navigate("/login");
                        } else {
                          navigate("/thanh-toan");
                        }
                      }}
                      className="hover:bg-[#fff] bg-[#f66315] hover:text-[#031230] text-white border border-solid border-[#f66315] min-w-[180px] cursor-pointer relative overflow-hidden transition-all my-0 rounded-[40px] flex items-center justify-center"
                    >
                      <span className="flex items-center justify-center py-[10px] px-[20px] gap-[6px]">
                        <FaCartShopping className="text-[16px]" />
                        <span className="leading-[1.2] text-[16px] font-[700] ">
                          Mua ngay
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[15px]">
                <div className="relative">
                  <div className="absolute w-[15%] bottom-0 right-0">
                    <img
                      className="block w-full max-w-full h-auto"
                      src={productDecor}
                      alt=""
                    />
                  </div>
                  <span className="inline-block py-1 px-5 text-[#f66315] font-[500] text-[14px] rounded-t-[12px] border border-solid border-[#f66315] border-b-0 relative z-1 bg-[#fff] translate-y-[1px]">
                    Ưu đãi
                  </span>
                  <div className="flex flex-col gap-[10px] p-5 rounded-b-[12px] rounded-r-[12px] border border-solid border-[#f66315] relative overflow-hidden min-h-[100px]">
                    <div className="absolute w-full pt-[55%] bottom-0 right-0 z-0 bg-6 translate-x-[42%] rotate-[328deg]"></div>
                    <div className="flex items-center gap-[10px]">
                      <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                        <img
                          src={icon_hot}
                          alt=""
                          className="max-w-full h-auto"
                        />
                      </span>
                      <span className="text-[#444545] text-[16px] font-[400]">
                        Tặng cước và căng cước vợt cầu lông miễn phí
                      </span>
                    </div>

                    <div className="flex items-center gap-[10px]">
                      <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                        <img
                          src={icon_hot}
                          alt=""
                          className="max-w-full h-auto"
                        />
                      </span>
                      <span className="text-[#444545] text-[16px] font-[400]">
                        Tặng bao nhung/bao đơn bảo vệ vợt cầu lông
                      </span>
                    </div>

                    <div className="flex items-center gap-[10px]">
                      <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                        <img
                          src={icon_hot}
                          alt=""
                          className="max-w-full h-auto"
                        />
                      </span>
                      <span className="text-[#444545] text-[16px] font-[400]">
                        Tặng quấn cán vợt cầu lông khi mua vợt
                      </span>
                    </div>

                    <div className="flex items-center gap-[10px]">
                      <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                        <img
                          src={step_icon}
                          alt=""
                          className="max-w-full h-auto"
                        />
                      </span>
                      <span className="text-[#444545] text-[16px] font-[400]">
                        Freeship khi chuyển khoản trước với đơn hàng trên 1
                        triệu
                      </span>
                    </div>

                    <div className="flex items-center gap-[10px]">
                      <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                        <img
                          src={ft_pay_icon}
                          alt=""
                          className="max-w-full h-auto"
                        />
                      </span>
                      <span className="text-[#444545] text-[16px] font-[400]">
                        Yên tâm với quy trình nhận hàng kiểm tra trước thanh
                        toán sau
                      </span>
                    </div>

                    <div className="flex items-center gap-[10px]">
                      <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                        <img
                          src={icon_new}
                          alt=""
                          className="max-w-full h-auto"
                        />
                      </span>
                      <span className="text-[#444545] text-[16px] font-[400]">
                        Bảo hành 3 tháng lỗi 1 đổi 1 lỗi nhà sản xuất
                      </span>
                    </div>

                    <div className="flex items-center gap-[10px]">
                      <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                        <img
                          src={icon_tag}
                          alt=""
                          className="max-w-full h-auto"
                        />
                      </span>
                      <span className="text-[#444545] text-[16px] font-[400]">
                        Cơ hội nhân voucher cho các đơn hàng tiếp theo
                      </span>
                    </div>

                    <div className="flex items-center gap-[10px]">
                      <span className="flex w-[14px] h-[14px] items-center justify-center shrink-0">
                        <img
                          src={cart_icon}
                          alt=""
                          className="max-w-full h-auto"
                        />
                      </span>
                      <span className="text-[#444545] text-[16px] font-[400]">
                        Vô vàn dịch vụ hỗ trơ miễn phí khác
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* mô tả */}
          <div className="mt-[100px]">
            <div className="flex flex-nowrap gap-[30px] ">
              <div
                onClick={() => setActive(1)}
                className=" relative p-[20px] pt-[10px] duration-300 ease-in-out cursor-pointer rounded-t-[12px] text-[24px] font-[700]"
              >
                {active === 1 ? (
                  <div>
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f66315]"></div>
                    <span className="text-[#f66315]">Mô tả sản phẩm</span>
                  </div>
                ) : (
                  <span className="text-[#031230]">Mô tả sản phẩm</span>
                )}
              </div>
              <div
                onClick={() => setActive(2)}
                className=" relative p-[20px] pt-[10px] duration-300 ease-in-out cursor-pointer rounded-t-[12px] text-[24px] font-[700]"
              >
                {product?.category === "vot" ? (
                  <>
                    {active === 2 ? (
                      <div>
                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f66315]"></div>
                        <span className="text-[#f66315]">
                          Thông số kỹ thuật
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#031230]">Thông số kỹ thuật</span>
                    )}
                  </>
                ) : null}
              </div>
              <div
                onClick={() => setActive(3)}
                className="relative p-[20px] pt-[10px] duration-300 ease-in-out cursor-pointer rounded-t-[12px] text-[24px] font-[700]"
              >
                {active === 3 ? (
                  <div>
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f66315]"></div>
                    <span className="text-[#f66315] flex">
                      Đánh giá {product?.ratings}{" "}
                      <img
                        src="https://fbshop.vn/template/assets/images/Star.svg"
                        alt=""
                        className="w-[18px] h-[18px] max-w-full mt-[8px]"
                      />
                    </span>
                  </div>
                ) : (
                  <span className="text-[#031230] flex">
                    Đánh giá {product?.ratings}{" "}
                    <img
                      src="https://fbshop.vn/template/assets/images/Star.svg"
                      alt=""
                      className="w-[18px] h-[18px] max-w-full mt-[8px]"
                    />
                  </span>
                )}
              </div>
            </div>
            {active === 1 ? (
              <div className="p-[30px] rounded-b-[12px] bg-[#feefe8] relative z-1">
                <div className="px-[15px] w-full text-[#000]">
                  <h2 className="text-[30px] my-[10px] font-[700]">
                    {product?.name}
                  </h2>
                  <p className="font-[400] text-[16px]">
                    {product?.description}
                  </p>
                </div>
              </div>
            ) : null}
            {active === 2 && product?.category === "vot" ? (
              <div className="p-[30px] rounded-b-[12px] bg-[#feefe8] relative z-1">
                <div className="px-[15px] w-full text-[#000]">
                  <h2 className="text-[30px] my-[10px] font-[700]">
                    {product?.name}
                  </h2>
                  <table className="w-full mb-[10px] border-collapse border-spacing-0">
                    <tbody>
                      <tr>
                        <td
                          width="30%"
                          className="text-left p-[15px] border border-solid border-[#444545]"
                        >
                          <b>Trình độ chơi:</b>
                        </td>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          Trung bình
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          <b>Độ cứng đũa:</b>
                        </td>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          Trung bình
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          <b>Phong cách chơi:</b>
                        </td>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          Công thủ toàn diện
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          <b>Nội dung chơi:</b>
                        </td>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          Cả đơn và đôi
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          <b>Trọng lượng:</b>
                        </td>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          {product?.weight}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          <b>Điểm cân bằng:</b>
                        </td>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          {product?.balancedPoint}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          <b>Chiều dài vợt:</b>
                        </td>
                        <td className="text-left p-[15px] border border-solid border-[#444545]">
                          {product?.length}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
            {active === 3 ? (
              <div className="p-[30px] rounded-b-[12px] bg-[#feefe8] relative z-1">
                <div className="mt-[24px]">
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="mb-[20px] flex items-center max-[800px]:flex-col">
                        <p className="text-[#f6af15] font-[700] text-[40px]">
                          {product?.ratings}{" "}
                          <span className="text-[24px]">/5</span>
                        </p>
                        <div className="flex ml-4">
                          {stars.map((star) => {
                            if (star <= product?.ratings) {
                              return (
                                <img
                                  src="https://fbshop.vn/template/assets/images/Star.svg"
                                  alt=""
                                  className="w-[24px] h-[24px] max-w-full"
                                />
                              );
                            } else {
                              return (
                                <img
                                  src="https://fbshop.vn/template/assets/images/Star-fill.svg"
                                  alt=""
                                  className="w-[24px] h-[24px] max-w-full"
                                />
                              );
                            }
                          })}
                        </div>
                      </div>
                      <div>
                        <span className="text-[16px]">
                          Bạn đã mua sản phẩm này?{" "}
                          <a
                            href="/danh-gia"
                            className="text-[#e10600] font-[700] no-underline"
                          >
                            Để lại đánh giá
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="relative mb-[50px]">
                      <ul className="list-none">
                        {product.reviews.length === 0 && (
                          <div>Chưa có đánh giá nào!!!</div>
                        )}
                        {product.reviews.map((review, index) => {
                          let date = new Date(review.createdAt);
                          return (
                            <li
                              className="border-solid border-b-[1px] border-b-[#f6dacd] py-[20px] relative"
                              key={index}
                            >
                              <div className="flex justify-start">
                                <div className="gap-[24px] flex justify-between">
                                  <div className="w-[78px] h-[78px] shrink-0 flex justify-center items-center rounded-[50%] overflow-hidden border border-[#f66315] border-solid">
                                    <img
                                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvb2NSSSdTcOp8UW1II7nYq1yd0IOc9AxPFA&usqp=CAU"
                                      alt=""
                                      className="block w-full object-cover max-w-full h-auto"
                                    />
                                  </div>
                                  <div>
                                    <div className="flex gap-[4px] items-center justify-start">
                                      <p className="text-[16px] font-[700]">
                                        {review.user.name}
                                      </p>
                                      <div className="flex items-center mb-[3px]">
                                        {stars.map((star) => {
                                          if (star <= review.rating) {
                                            return (
                                              <img
                                                src="https://fbshop.vn/template/assets/images/Star.svg"
                                                alt=""
                                                className="w-[24px] h-[24px] max-w-full"
                                              />
                                            );
                                          } else {
                                            return (
                                              <img
                                                src="https://fbshop.vn/template/assets/images/Star-fill.svg"
                                                alt=""
                                                className="w-[24px] h-[24px] max-w-full"
                                              />
                                            );
                                          }
                                        })}
                                      </div>
                                    </div>
                                    <div className="text-[#444545] my-[10px]">
                                      <p>{review.comment}</p>
                                    </div>
                                    <div className="mt-[10px]">
                                      <span className="text-[#444545] font-[700] text-[14px]">
                                        {`${date.getDate()}/${
                                          date.getMonth() + 1
                                        }/${date.getFullYear()}`}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {success && (
                    <form action="">
                      <div className="mt-[50px]">
                        <p className="text-[24px] font-[700] text-[#f66315]">
                          Đánh giá sản phẩm
                        </p>
                        <p className="mt-[10px] text-[14px]">
                          Hãy chia sẻ những điều bạn nghĩ về sản phẩm này với
                          những người mua khác nhé.
                        </p>
                        <br />
                        <span className="text-[#031230] flex text-[16px] font-[700]">
                          <span>Chất lượng sản phẩm</span>
                          <div className="ml-[5px] flex flex-col items-center">
                            <div className="flex w-full justify-center">
                              {[...Array(5)].map((_, index) => (
                                <img
                                  key={index}
                                  src={
                                    index < rating
                                      ? "https://fbshop.vn/template/assets/images/Star.svg"
                                      : "https://fbshop.vn/template/assets/images/Star-fill.svg"
                                  }
                                  alt=""
                                  className="w-[24px] h-[24px] max-w-full cursor-pointer"
                                  onClick={() => handleStarClick(index)}
                                />
                              ))}
                            </div>
                          </div>
                        </span>
                        <div className="mt-[30px]">
                          <div className="flex mx-[-12px] flex-wrap justify-between">
                            <div className="w-[100%] px-3 mt-[20px]">
                              <label className="text-[16px] text-[#031230] font-[500] mb-[10px] block">
                                Đánh giá của bạn{" "}
                                <span className="text-[#f66315]">*</span>
                              </label>
                              <textarea
                                type="text"
                                placeholder="Viết đánh giá"
                                className="w-full text-[14px] font-[400] border-none min-h-[84px] px-[20px] py-[10px] rounded-[12px] text-[#031230] focus:outline-none focus:ring-1 focus:ring-[#f66315]"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              ></textarea>
                            </div>
                          </div>
                          <div className="flex justify-end  mt-[30px]">
                            <div
                              onClick={handleCreateReview}
                              className="border border-solid border-[#f66315] w-fit mx-auto min-w-[120px] rounded-[4rem] relative"
                            >
                              <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                                <div className="py-[10px] px-[40px] flex items-center justify-center gap-[6px]">
                                  <FaPaperPlane className="text-[16px]" />
                                  <span className="text-[16px] font-[500] leading-[1.2]">
                                    Gửi ngay
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <></>
      )}
      {products ? (
        <div className="mt-[100px] max-w-[1230px] mx-auto">
          <div className="w-full h-full mx-auto px-[15px]">
            <h2 className="text-[40px] font-[700] text-[#031230]">
              Sản phẩm tương tự
            </h2>
            <div className="mt-[30px]">
              <div className="after:block after:clear-both">
                <div className="m-[-12px] opacity-100 visible h-auto">
                  <div className="mx-auto overflow-hidden list-none z-1 p-[12px]">
                    <div className="relative w-full h-full z-1 flex box-content transition-transform">
                      <Swiper
                        breakpoints={{
                          280: {
                            slidesPerView: "auto",
                            spaceBetween: 15,
                          },
                          640: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                          },
                          768: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                          },
                          992: {
                            slidesPerView: 4,
                            spaceBetween: 14,
                          },
                          1024: {
                            slidesPerView: 4,
                            spaceBetween: 14,
                          },
                        }}
                        // centeredSlides={true}
                        grabCursor={true}
                        freeMode={true}
                        pagination={{
                          // clickable: true,
                          enabled: false,
                        }}
                        modules={[FreeMode, Pagination]}
                      >
                        {products.map((item, i) => {
                          return (
                            <SwiperSlide className="!w-[284px] h-auto" key={i}>
                              <SuggestProductCard product={item} />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const SuggestProductCard = ({ product }) => {
  let isStocking = true;
  const stars = [1, 2, 3, 4, 5];
  let percent = 0;
  if (product) {
    isStocking = product.stock > 0;
    percent = Math.round(
      ((product.discountPrice - product.originalPrice) /
        product.originalPrice) *
        100
    );
  }
  return (
    <div className="px-[7px] w-full max-[800px]:w-[50%]">
      <div className="h-full">
        <div className="group flex flex-col h-full p-[10px] rounded-[12px] bg-[#fff] duration-300 ease-in-out hover:shadow-2">
          <div className="relative">
            <div className="relative pt-[100%] rounded-[12px] overflow-hidden">
              <Link to={`/san-pham/${product._id}`}>
                <img
                  className="group-hover:scale-105 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-37%] object-cover duration-300 ease-in-out object-top w-full h-auto max-w-full"
                  width="300"
                  height="400"
                  src={product.images[0].url}
                  alt=""
                />
              </Link>
            </div>
            <div className="absolute min-w-12 top-5 left-[10px] z-1 flex items-center justify-center">
              <div className="absolute w-full min-h-[48px] top-[-10px] -z-1 left-[0px] bg-no-repeat bg-contain bg-sale"></div>
              <div className="font-[700] text-[#fff] mt-[2px]">{percent}%</div>
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
              <div className="relative w-10 h-10 flex items-center justify-center rounded-[50%] text-[#f66315] bg-[#feefe8] hover:bg-[#f66315] hover:text-[#fff] text-[16px] duration-300 ease-in-out cursor-pointer">
                <FaRegHeart />
              </div>
              <div className="relative w-10 h-10 flex items-center justify-center rounded-[50%] text-[#f66315] bg-[#feefe8] hover:bg-[#f66315] hover:text-[#fff] text-[20px] duration-300 ease-in-out cursor-pointer">
                <AiOutlineShoppingCart />
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
                            className="w-[14px] h-[14px] max-w-full"
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
                ({product.ratings})
              </span>
            </div>
            <Link
              to={`/san-pham/${product._id}`}
              className="text-[16px] font-[500] overflow-hidden line-clamp-2 text-ellipsis no-underline duration-300 hover:text-[#f66315] ease-in-out"
            >
              {product.name}{" "}
            </Link>
            <div className="flex items-center gap-[10px] pt-[10px] mt-auto">
              <span className="text-[20px] md:text-[18px] text-[#f66315] font-[700]">
                {product.discountPrice}đ
              </span>
              <span className="text-[16px] md:text-[14px] text-[#7f8080] line-through">
                {product.originalPrice}đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
