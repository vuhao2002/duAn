import axios from "axios";
import {
  BRAND_DELETE_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  CREATE_BRAND_FAIL,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_RESET,
  CREATE_BRAND_SUCCESS,
} from "../Constants/branchContants";

import { server } from "../../server";

import { toast } from "react-toastify";

// CREATE BRANCH
export const branchCreate = (data) => async (dispatch) => {
  try {
    console.log(data);
    dispatch({ type: CREATE_BRAND_REQUEST });
    await axios.post(`${server}/shop/create-info-shop`, data, {
      withCredentials: true,
    });
    dispatch({ type: CREATE_BRAND_SUCCESS });
    toast.success("Tạo thông tin chi nhánh mới thành công!");
  } catch (error) {
    toast.error("Tạo thông tin chi nhánh mới thất bại!");
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_BRAND_FAIL,
      payload: message,
    });
  }
};

// LIST BRAND
export const listBranch = () => async (dispatch) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });

    const { data } = await axios.get(`${server}/shop`);
    dispatch({ type: CREATE_BRAND_RESET });
    dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BRAND_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE BRAND
export const deleteBranch = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${server}/shop/delete-shop/${id}`, {
      withCredentials: true,
    });
    toast.success("Xóa chi nhánh thành công!");
    dispatch({ type: BRAND_DELETE_SUCCESS, payload: data });
  } catch (error) {
    toast.error("Xóa chi nhánh thất bại!");
  }
};
