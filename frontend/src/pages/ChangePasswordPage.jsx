import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { LuFileClock } from "react-icons/lu";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserPassword } from "../Redux/Actions/userActions";

const ChangePasswordPage = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  if (userInfo === null) {
    navigate("/login");
  }

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    dispatch(updateUserPassword(oldPassword, newPassword, confirmPassword));
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="font-Roboto">
      <Header />
      <div className="mt-[100px]">
        <div className="w-full max-w-[1230px] h-full mx-auto px-[15px]">
          <div className="relative mb-[100px] z-1">
            <div className="p-[50px] rounded-[12px] bg-[#fff] shadow-2">
              {userInfo ? (
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
                          className="no-underline duration-300 ease-in-out flex gap-[10px] py-[10px] px-[34px] items-center rounded-[48px] group hover:bg-[#feefe8]"
                        >
                          <FaRegUser className="text-[18px] text-[#7f8080] group-hover:text-[#f66315]" />
                          <span className="group-hover:text-[#f66315]">
                            Thông tin tài khoản
                          </span>
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/tai-khoan/change-password"
                          className="no-underline duration-300 ease-in-out flex gap-[10px] py-[10px] px-[34px] items-center rounded-[48px] bg-[#feefe8]"
                        >
                          <MdLockOutline className="text-[18px] text-[#f66315]" />
                          <span className="text-[#f66315]">
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
                      <div className="w-[66.6666667%]">
                        <form onSubmit={handleUpdatePassword}>
                          <p className="mb-[20px] text-[20px] font-[700]">
                            Thay đổi mật khẩu
                          </p>
                          <div className="flex flex-col gap-[20px] mb-[30px]">
                            <div className="w-[100%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Mật khẩu hiện tại&nbsp;
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type={visible1 ? "text" : "password"}
                                  placeholder="Nhập mật khẩu hiện tại"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={oldPassword}
                                  onChange={(e) =>
                                    setOldPassword(e.target.value)
                                  }
                                />
                                {visible1 ? (
                                  <AiOutlineEye
                                    className="absolute right-3 top-[25%] cursor-pointer text-orange-500"
                                    size={20}
                                    onClick={() => setVisible1(false)}
                                  />
                                ) : (
                                  <AiOutlineEyeInvisible
                                    className="absolute right-3 top-[25%] cursor-pointer text-orange-500"
                                    size={20}
                                    onClick={() => setVisible1(true)}
                                  />
                                )}
                              </span>
                            </div>

                            <div className="w-[100%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Mật khẩu mới&nbsp;
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type={visible2 ? "text" : "password"}
                                  placeholder="Nhập mật khẩu mới"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                />
                                {visible2 ? (
                                  <AiOutlineEye
                                    className="absolute right-3 top-[25%] cursor-pointer text-orange-500"
                                    size={20}
                                    onClick={() => setVisible2(false)}
                                  />
                                ) : (
                                  <AiOutlineEyeInvisible
                                    className="absolute right-3 top-[25%] cursor-pointer text-orange-500"
                                    size={20}
                                    onClick={() => setVisible2(true)}
                                  />
                                )}
                              </span>
                            </div>

                            <div className="w-[100%] px-[12px]">
                              <label
                                htmlFor=""
                                className="font-[500] text-[16px] text-[#031230] leading-[1.1]"
                              >
                                Xác nhận mật khẩu&nbsp;
                              </label>
                              <span className="relative flex mt-[10px]">
                                <input
                                  type={visible3 ? "text" : "password"}
                                  placeholder="Xác nhận mật khẩu"
                                  className="w-full text-[14px] font-[400] h-[42px] px-[20px] rounded-[34px] border border-solid border-[#c9c9c9] text-[#031230] focus:border-[#f66215] focus:outline-none"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                />
                                {visible3 ? (
                                  <AiOutlineEye
                                    className="absolute right-3 top-[25%] cursor-pointer text-orange-500"
                                    size={20}
                                    onClick={() => setVisible3(false)}
                                  />
                                ) : (
                                  <AiOutlineEyeInvisible
                                    className="absolute right-3 top-[25%] cursor-pointer text-orange-500"
                                    size={20}
                                    onClick={() => setVisible3(true)}
                                  />
                                )}
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;
