import React from "react";
import logo from "../../../images/logo-removebg.png";
const IntroBrands = () => {
  return (
    <div className="relative py-[100px] z-1 mb-[80px]">
      <div className="text-center bg-2 w-full max-w-[1230px] h-full mx-auto px-[15px]">
        <div className="w-[120px] h-[110px] mx-auto object-contain">
          <a href="/">
            <img
              src={logo}
              alt=""
              width="397"
              height="398"
              className="max-w-full h-auto"
            />
          </a>
        </div>
        <div className="lg:text-[40px] text-[35px] font-[700] text-[#031230] text-center mb-[20px] mt-1">
          Đồng hành cùng nhiều nhãn hàng
          <br />
          uy tín trên thế giới
        </div>
        <div className="text-[#444545] text-center text-[16px]">
          Chúng tôi hân hạnh trở thành đối tác phân phối
          <br />
          của các nhãn hàng uy tín trên toàn thế giới
        </div>
      </div>

      <div className="md:left-[5%] md:top-[45%] left-0 top-[55%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="data:image/png;base64,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"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="md:right-[5%] right-0 md:top-[60%] top-[54%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="left-[20%] md:top-[65%] top-[90%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="https://yt3.googleusercontent.com/ytc/AIf8zZRWxA5Y1_M2QJB3YqtDrazrXMWVvRv989U2mtYUHA=s900-c-k-c0x00ffffff-no-rj"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="md:left-[25%] left-[20%] top-[25%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="https://sudospaces.com/phukienthethao/2023/04/logo-hang-kumpoo.jpg"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="right-[18%] top-[30%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="https://seeklogo.com/images/L/li-ning-logo-361F15D12F-seeklogo.com.png"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>

      <div className="right-[28%] md:top-[80%] top-[90%] absolute translate-y-[-50%] group w-[100px] h-[100px] rounded-[8px] flex items-center justify-center">
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-[6px] opacity-[0.5] -z-1 bg-3 group-hover:scale-[1.1] duration-300 ease-in-out"></div>
        <img
          src="https://seeklogo.com/images/M/mizuno-logo-69091B9350-seeklogo.com.png"
          alt=""
          width="500"
          height="500"
          className="w-[50px] h-auto max-w-full"
        />
      </div>
    </div>
  );
};

export default IntroBrands;
