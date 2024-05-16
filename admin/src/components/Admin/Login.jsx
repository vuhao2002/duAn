import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../Redux/Actions/userActions";
import logo from "../../images/logo-removebg.png";

import { login } from "../../Redux/Actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  console.log(email, password);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminInfo) {
      navigate("/dashboard");
    }
  }, [adminInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="overflow-hidden bg-cover bg-no-repeat h-[100vh] p-12 bg-[url('https://t4.ftcdn.net/jpg/04/86/39/87/360_F_486398788_gAOGBgemxkzJ6JHUJD7vN5A0ayQ2FLxF.jpg')]">
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold"
          >
            <img className="w-12 h-12 mr-2 mt-1" src={logo} alt="logo" />
            <span className="text-white">BadmintonShop</span>
          </Link>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#e95221] md:text-2xl">
                Đăng nhập tài khoản
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5 "
                    placeholder="shopvnb@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Mật khẩu
                  </label>
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border-[2px] border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 block w-full p-2.5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2/4  cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2/4  cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:outline-none"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-800 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#ff5a3d] focus:bg-sky-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* </div> */}
    </div>
  );
};

export default Login;
