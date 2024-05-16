import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  REFUND_ORDER_FAIL,
  REFUND_ORDER_REQUEST,
  REFUND_ORDER_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../Constants/orderContants";
import { CART_CLEAR_ITEMS } from "../Constants/cartConstants";
import { logout } from "./userActions";

import { server } from "../../server";

import { toast } from "react-toastify";

// CREATE ORDER
export const createOrder = (newData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { data } = await axios.post(`${server}/order/create-order`, newData, {
      withCredentials: true,
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.orders[0] });
    dispatch({ type: CART_CLEAR_ITEMS, payload: data.orders[0] });
    toast.success("Order successful!");
    localStorage.removeItem("cartItems");
  } catch (error) {
    toast.error("Order error!");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`${server}/order/get-order/${id}`);
    const newData = {
      success: true,
      orders: [data],
    };
    console.log(newData);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: newData });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// ORDER DETAILS
export const refundOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: REFUND_ORDER_REQUEST });
    const { data } = await axios.put(
      `${server}/order/order-refund-success/${id}`,
      {
        status: "Refund Success",
      },
      {
        withCredentials: true,
      }
    );
    console.log(data);
    toast.success("Hủy thành công!");
    dispatch({ type: REFUND_ORDER_SUCCESS, payload: data.order });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error("Hủy không thành công!");
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: REFUND_ORDER_FAIL,
      payload: message,
    });
  }
};

// ORDER PAY
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `api/user/order/pay/${orderId}`,
        paymentResult,
        config
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not Authorized token expired, Please Login again.") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };

// USER ORDERS
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.user._id);
    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userInfo.user._id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};
