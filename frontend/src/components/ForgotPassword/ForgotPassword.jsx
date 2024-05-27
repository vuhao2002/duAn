import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../images/logo-removebg.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [token, setToken] = useState();
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  console.log(verificationCode);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (isCodeSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isCodeSent, timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:5000/api/user/forgot-password-token`, { email })
      .then((res) => {
        toast.success("Vui lòng kiểm tra email để nhận mã xác thực.");

        setToken(res.data);
        setIsCodeSent(true);
        setTimer(60); // Reset lại timer khi mã mới được gửi
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleResendCode = async (e) => {
    await handleSubmit(e);
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    // Logic để kiểm tra mã xác thực từ backend
    if (verificationCode === token) {
      toast.success("Mã xác thực chính xác. Bạn có thể đặt lại mật khẩu.");
      setIsVerified(true);
    } else {
      toast.error("Mã xác thực không chính xác. Vui lòng thử lại.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    const data = {
      password: newPassword,
      token,
    };
    await axios
      .put(`http://localhost:5000/api/user/reset-password`, data)
      .then((res) => {
        toast.success("Mật khẩu đã được đặt lại thành công.");
        // Chuyển hướng người dùng đến trang đăng nhập
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="overflow-hidden bg-cover bg-no-repeat h-[100vh] p-12 bg-[url('https://t4.ftcdn.net/jpg/04/86/39/87/360_F_486398788_gAOGBgemxkzJ6JHUJD7vN5A0ayQ2FLxF.jpg')]">
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-4 text-2xl font-semibold"
          >
            <img className="w-12 h-12 mr-2 mt-1" src={logo} alt="logo" />
            <span className="text-white">BadmintonShop</span>
          </Link>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {!isCodeSent ? (
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-[#e95221] md:text-2xl">
                    Quên mật khẩu
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5"
                        placeholder="badmintonshop@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#ff5a3d] focus:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Reset
                    </button>
                    <div className="text-sm font-[400] text-gray-700 flex justify-between m-[16px]">
                      <Link
                        to="/sign-up"
                        className="font-[600] text-primary-600 hover:underline"
                      >
                        Đăng ký
                      </Link>
                      <Link
                        to="/login"
                        className="font-[600] text-primary-600 hover:underline"
                      >
                        Đăng nhập ngay
                      </Link>
                    </div>
                  </form>
                </>
              ) : isVerified ? (
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-[#e95221] md:text-2xl">
                    Đặt lại mật khẩu
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleResetPassword}
                  >
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Xác nhận mật khẩu
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#ff5a3d] focus:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Đặt lại mật khẩu
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-[#e95221] md:text-2xl">
                    Nhập mã xác thực
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleVerification}
                  >
                    <div>
                      <label
                        htmlFor="verificationCode"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Mã xác thực
                      </label>
                      <input
                        type="text"
                        name="verificationCode"
                        id="verificationCode"
                        className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5"
                        placeholder="Nhập mã xác thực"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#ff5a3d] focus:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Xác thực
                    </button>
                    {timer === 0 ? (
                      <div
                        className=" text-red-500 font-medium text-sm cursor-pointer inline-block ml-1"
                        onClick={handleResendCode}
                      >
                        Thử lại
                      </div>
                    ) : (
                      <p className="text-gray-700 font-medium text-sm ml-1">
                        Mã xác thực sẽ hết hạn sau: <span>{timer}</span> giây
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
