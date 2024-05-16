import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrderDetails,
  orderChangeStatus,
} from "../../Redux/Actions/orderActions.js";

const OrderDetail = () => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  const [status, setStatus] = useState("");
  const { id } = useParams();
  let date;
  if (order) {
    date = new Date(order.createdAt);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const handleChangeStatus = () => {
    dispatch(orderChangeStatus(id, status));
  };
  return (
    <>
      {order ? (
        <div className={`py-4 min-h-screen w-11/12 mx-auto`}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <BsFillBagFill size={30} className="text-[#f66315]" />
              <h1 className="pl-2 text-[25px]">Order Details</h1>
            </div>
            <Link to="/admin/orders">
              <div className="w-[140px] my-3 flex items-center justify-center duration-300 cursor-pointer border border-solid border-[#f66315] bg-[#f66315] rounded-[4px] text-[#fff] font-[600] h-[45px] text-[18px] hover:bg-[#fff] hover:text-[#f66315]">
                Order List
              </div>
            </Link>
          </div>

          <div className="w-full flex items-center justify-between pt-2">
            <h5 className="text-[#00000084]">
              Order ID: <span>{order._id}</span>
            </h5>
            <h5 className="text-[#00000084]">
              Đặt vào:{" "}
              <span>{`${date.getDate()} tháng ${
                date.getMonth() + 1
              }, ${date.getFullYear()}`}</span>
            </h5>
          </div>

          {/* order items */}
          <br />
          <br />
          {order.cart &&
            order.cart.map((item, index) => (
              <div className="w-full flex items-start mb-5">
                <img
                  src={item.images[0].url}
                  alt=""
                  className="w-[80x] h-[80px]"
                />
                <div className="w-full">
                  <h5 className="pl-3 text-[20px]">{item.name}</h5>
                  <h5 className="pl-3 text-[20px] text-[#00000091]">
                    {item.discountPrice}đ x {item.qty}
                  </h5>
                </div>
              </div>
            ))}

          <div className="border-t w-full text-right">
            <h5 className="pt-3 text-[18px]">
              Total Price: <strong>{order.totalPrice}đ</strong>
            </h5>
          </div>
          <br />
          <div className="w-full 800px:flex items-center">
            <div className="w-full 800px:w-[60%]">
              <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
              <h4 className="pt-3 text-[20px]">
                {order.shippingAddress.address} {order.shippingAddress.ward},{" "}
                {order.shippingAddress.district} {order.shippingAddress.city}
              </h4>
              <h4 className=" text-[20px]">
                {order.shippingAddress.phoneNumber}
              </h4>
              <h4 className=" text-[20px]">{order.shippingAddress.name}</h4>
            </div>
            <div className="w-full 800px:w-[40%]">
              <h4 className="pt-3 text-[20px]">Status:</h4>
              <h4>Status: {order.status}</h4>
            </div>
          </div>
          <br />
          <br />
          <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
          <select
            value={status === "" ? order.status : status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Delivered",
              "Refund",
              "Refund Success",
            ].map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>

          <div
            onClick={handleChangeStatus}
            className={`w-[140px] my-3 flex items-center justify-center border border-solid border-[#f66315]  cursor-pointer mt-5 bg-[#f66315] rounded-[4px] text-[#fff] hover:bg-[#fff] hover:text-[#f66315] duration-300 font-[600] h-[45px] text-[18px]`}
          >
            Update Status
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderDetail;
