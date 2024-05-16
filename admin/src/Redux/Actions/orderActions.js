import axios from "axios";
import {
  ORDER_CHANGE_STATUS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../Constants/orderContants";

import { server } from "../../server";

import { toast } from "react-toastify";

// USER ORDERS
export const listOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const { data } = await axios.get(`${server}/order/get-admin-all-orders`, {
      withCredentials: true,
    });
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data.orders });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

// CHANGE STATUS ORDER
export const orderChangeStatus = (id, status) => async (dispatch) => {
  try {
    await axios.put(
      `${server}/order/update-order-status/${id}`,
      {
        status: status,
      },
      {
        withCredentials: true,
      }
    );

    dispatch({ type: ORDER_CHANGE_STATUS_SUCCESS });
    toast.success("Cập nhật trạng thái đơn hàng thành công!");
  } catch (error) {
    toast.success("Cập nhật trạng thái đơn hàng thất bại!");
  }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`${server}/order/get-order/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};
