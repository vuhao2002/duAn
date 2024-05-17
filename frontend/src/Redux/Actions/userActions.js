import axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_ADDRESS_FAIL,
  USER_UPDATE_ADDRESS_REQUEST,
  USER_UPDATE_ADDRESS_SUCCESS,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
} from "../Constants/userContants";
import { ORDER_LIST_MY_RESET } from "../Constants/orderContants";
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
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    toast.success("Đăng nhập thành công!");
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(error.response.data.message);
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
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

// REGISTER
export const register =
  (name, email, password, phoneNumber) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${server}/user/register`,
        { name, email, password, phoneNumber },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post("api/user/forgot-password-token", { email }, config);
    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`api/user/${id}`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// UPDATE PROFILE
export const updateUserProfile =
  (name, email, phoneNumber) => async (dispatch) => {
    try {
      console.log({ name: name, email: email, phoneNumber: phoneNumber });
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
      const { data } = await axios.put(
        `${server}/user/edit-user`,
        {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
        },
        { withCredentials: true }
      );
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      toast.success("Thay đổi thông tin thành công!");

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(error.response.data.message);

      if (message === "Not Authorized token expired, Please Login again.") {
        dispatch(logout());
      }
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      });
    }
  };

// UPDATE ADDRESS
export const updateUserAddress = (dataAddress) => async (dispatch) => {
  try {
    console.log(dataAddress);
    dispatch({ type: USER_UPDATE_ADDRESS_REQUEST });
    const { data } = await axios.put(
      `${server}/user/update-user-addresses`,
      dataAddress,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: USER_UPDATE_ADDRESS_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    toast.success("Thay đổi địa chỉ thành công!");

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(error.response.data.message);

    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_ADDRESS_FAIL,
      payload: message,
    });
  }
};

// UPDATE PASSWORD
export const updateUserPassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      console.log(oldPassword, newPassword, confirmPassword);
      dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });
      const { data } = await axios.put(
        `${server}/user/update-user-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );
      dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      toast.success("Thay đổi mật khẩu thành công!");
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(error.response.data.message);

      if (message === "Not Authorized token expired, Please Login again.") {
        dispatch(logout());
      }
      dispatch({
        type: USER_UPDATE_PASSWORD_FAIL,
        payload: message,
      });
    }
  };

// RESET PASSWORD
export const resetPasswordUser =
  (token, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_RESET_PASSWORD_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `http://localhost:3000/api/user/reset-password/${token}`,
        { password },
        config
      );
      console.log(data);
      dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not Authorized token expired, Please Login again.") {
        dispatch(logout());
      }
      dispatch({
        type: USER_RESET_PASSWORD_FAIL,
        payload: message,
      });
    }
  };
