import axios from "axios";
import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DELETE_SUCCESS,
} from "../Constants/userContants";

import { server } from "../../server";

import { toast } from "react-toastify";

// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      `${server}/user/login-user`,
      { email, password },
      { withCredentials: true }
    );
    if (data.role !== "admin") {
      dispatch({ type: USER_LOGIN_FAIL });
    }
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    toast.success("Đăng nhập thành công!");
    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    toast.error(error.response.data.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("adminInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_LIST_RESET });
    await axios.get(`${server}/user/logout`, { withCredentials: true });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ALL USER
export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get(`${server}/user/get-all-users`, {
      withCredentials: true,
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data.users });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE BRAND
export const deleteUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${server}/user/delete-user/${id}`, {
      withCredentials: true,
    });
    console.log(data);
    toast.success("Xóa người dùng thành công!");
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    toast.error("Xóa người dùng thất bại!");
  }
};
