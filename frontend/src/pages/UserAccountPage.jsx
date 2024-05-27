import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { LuFileClock } from "react-icons/lu";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  logout,
  updateUserAddress,
  updateUserProfile,
} from "../Redux/Actions/userActions";

const UserAccountPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo === null) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  const [name, setName] = useState(userInfo?.user?.name || "");
  const [email, setEmail] = useState(userInfo?.user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    userInfo?.user?.phoneNumber || ""
  );

  const [city, setCity] = useState(userInfo?.user?.addresses[0]?.city || "");
  const [district, setDistrict] = useState(
    userInfo?.user?.addresses[0]?.district || ""
  );
  const [ward, setWard] = useState(userInfo?.user?.addresses[0]?.ward || "");
  const [address, setAddress] = useState(
    userInfo?.user?.addresses[0]?.address || ""
  );
  console.log(city, district, ward, address);

  const dispatch = useDispatch();

  const handleUpdateInfoUser = async (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(name, email, phoneNumber));
  };

  const handleUpdateUserAddress = async (e) => {
    e.preventDefault();
    let data = {
      city,
      district,
      ward,
      address,
    };
    if (userInfo?.user?.addresses[0]) {
      data = { ...data, _id: userInfo.user.addresses[0]._id };
    }
    dispatch(updateUserAddress(data));
  };

  return (
    <div className="font-Roboto">
      <Header />
      {userInfo ? (
        <div className="mt-[100px]">
          <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
            <div className="relative mb-[100px] z-1">
              <div className="p-[50px] rounded-[12px] bg-[#fff] shadow-2">
                <div className="flex mx-[-25px]">
                  {/* left */}
                  <div className="w-[25%] px-[25px]">
                    <div className="flex gap-[20px]">
                      <div className="w-[70px] h-[70px] shrink-0 rounded-[50%] overflow-hidden border border-solid border-[#1d9d06]">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvb2NSSSdTcOp8UW1II7nYq1yd0IOc9AxPFA&usqp=CAU"
                          alt=""
                          className="block w-full object-cover max-w-full h-auto"
                        />
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <p className="font-[700] text-[24px]">
                          {userInfo.user.name}
                        </p>
                        <div
                          className="text-[#7f8080] hover:text-[#f66315] duration-300 ease-in-out underline"
                          onClick={() => {
                            dispatch(logout());
                            navigate("/");
                          }}
                        >
                          Đăng xuất
                        </div>
                      </div>
                    </div>
                    {/* list */}
                    <div className="flex flex-col gap-[20px] mt-[50px]">
                      <div>
                        <Link
                          to="/tai-khoan"
                          className="no-underline duration-300 ease-in-out flex gap-[10px] py-[10px] px-[34px] items-center rounded-[48px] bg-[#feefe8]"
                        >
                          <FaRegUser className="text-[18px] text-[#f66315]" />
                          <span className="text-[#f66315]">
                            Thông tin tài khoản
                          </span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/tai-khoan/change-password"
                          className="no-underline duration-300 ease-in-out flex gap-[10px] py-[10px] px-[34px] items-center rounded-[48px] group hover:bg-[#feefe8]"
                        >
                          <MdLockOutline className="text-[18px] text-[#7f8080] group-hover:text-[#f66315]" />
                          <span className="group-hover:text-[#f66315]">
                            Thay đổi mật khẩu
                          </span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/tai-khoan/orders"
                          className="no-underline duration-300 ease-in-out flex gap-[10px] py-[10px] px-[34px] items-center rounded-[48px] group hover:bg-[#feefe8]"
                        >
                          <LuFileClock className="text-[18px] text-[#7f8080] group-hover:text-[#f66315]" />
                          <span className="group-hover:text-[#f66315]">
                            Lịch sử đơn hàng
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="w-[75%] px-[25px]">
                    <div className="relative">
                      <div className="absolute w-[1px] h-full right-[105%] bg-[#f0f0f0] top-[50%] translate-y-[-50%]"></div>
                      <form onSubmit={handleUpdateInfoUser}>
                        <div className="pb-[30px] border-b border-b-solid border-b-[#f0f0f0]">
                          <p className="mb-[20px] text-[20px] font-[700] text-[#031230]">
                            Thông tin tài khoản
                          </p>
                          <div className="flex flex-wrap gap-y-[20px] mx-[-12px]">
                            <div className="w-[50%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Họ và tên&nbsp;
                                <abbr
                                  title="bắt buộc"
                                  className="text-[red] font-[700] border-0 no-underline"
                                >
                                  *
                                </abbr>
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type="text"
                                  placeholder="Nhập tên của bạn"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  required
                                />
                              </span>
                            </div>
                            {/* <div className="w-[50%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Ngày sinh&nbsp;
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type="text"
                                  placeholder="VD: 22/03/2002"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                />
                              </span>
                            </div> */}
                            <div className="w-[50%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Email&nbsp;
                                <abbr
                                  title="bắt buộc"
                                  className="text-[red] font-[700] border-0 no-underline"
                                >
                                  *
                                </abbr>
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type="email"
                                  placeholder="Nhập email của bạn"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                              </span>
                            </div>
                            <div className="w-[50%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Số điện thoại&nbsp;
                                <abbr
                                  title="bắt buộc"
                                  className="text-[red] font-[700] border-0 no-underline"
                                >
                                  *
                                </abbr>
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type="text"
                                  placeholder="Phone"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  required
                                />
                              </span>
                            </div>
                          </div>
                          <div className="mt-[30px] flex items-center gap-[24px]">
                            <div className="w-[50%] mx-auto">
                              <div className="border border-solid border-[#f66315] w-full mx-auto min-w-[120px] rounded-[4rem] relative">
                                <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                                  <div className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]">
                                    <button
                                      className="text-[16px] font-[500] leading-[1.2]"
                                      type="submit"
                                    >
                                      Lưu thay đổi
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <form onSubmit={handleUpdateUserAddress}>
                        <div className="py-[30px]">
                          <p className="mb-[20px] text-[20px] font-[700] text-[#031230]">
                            Thông tin giao hàng
                          </p>
                          <div className="flex flex-wrap gap-y-[20px] mx-[-12px]">
                            <div className="w-[33.333333%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Tỉnh/thành phố&nbsp;
                                <abbr
                                  title="bắt buộc"
                                  className="text-[red] font-[700] border-0 no-underline"
                                >
                                  *
                                </abbr>
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type="text"
                                  placeholder="Tỉnh/thành phố"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  required
                                />
                              </span>
                            </div>
                            <div className="w-[33.333333%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Quận/huyện&nbsp;
                                <abbr
                                  title="bắt buộc"
                                  className="text-[red] font-[700] border-0 no-underline"
                                >
                                  *
                                </abbr>
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type="text"
                                  placeholder="Quận/huyện"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={district}
                                  onChange={(e) => setDistrict(e.target.value)}
                                  required
                                />
                              </span>
                            </div>
                            <div className="w-[33.333333%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Phường/xã&nbsp;
                                <abbr
                                  title="bắt buộc"
                                  className="text-[red] font-[700] border-0 no-underline"
                                >
                                  *
                                </abbr>
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type="text"
                                  placeholder="Phường/xã"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={ward}
                                  onChange={(e) => setWard(e.target.value)}
                                  required
                                />
                              </span>
                            </div>
                            <div className="w-[100%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Địa chỉ&nbsp;
                                <abbr
                                  title="bắt buộc"
                                  className="text-[red] font-[700] border-0 no-underline"
                                >
                                  *
                                </abbr>
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type="text"
                                  placeholder="Địa chỉ của bạn"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  required
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-[30px] flex items-center gap-[24px]">
                          <div className="w-[50%] mx-auto">
                            <div className="border border-solid border-[#f66315] w-full mx-auto min-w-[120px] rounded-[4rem] relative">
                              <div className="text-[#fff] cursor-pointer relative bg-[#f66315] hover:bg-[#fff] hover:text-[#031230] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                                <div className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]">
                                  <button
                                    className="text-[16px] font-[500] leading-[1.2]"
                                    type="submit"
                                  >
                                    Lưu thay đổi
                                  </button>
                                </div>
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
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
};

export default UserAccountPage;
