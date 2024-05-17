import {
  CREATE_NEWS_SUCCESS,
  NEWS_DELETE_SUCCESS,
  NEWS_DETAILS_FAIL,
  NEWS_DETAILS_REQUEST,
  NEWS_DETAILS_SUCCESS,
  NEWS_EDIT_FAIL,
  NEWS_EDIT_REQUEST,
  NEWS_EDIT_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
} from "../Constants/newsContants";

import { server } from "../../server";

import { toast } from "react-toastify";

import axios from "axios";
import { RESET_IMG } from "../Constants/productConstants";

// CREATE NEWS
export const createNews = (dataProduct) => async (dispatch) => {
  try {
    console.log(dataProduct);
    await axios.post(`${server}/news/create-news`, dataProduct, {
      withCredentials: true,
    });
    dispatch({ type: CREATE_NEWS_SUCCESS });
    dispatch({ type: RESET_IMG });
    toast.success("Thêm tin tức thành công!");
  } catch (error) {
    toast.error("Thêm tin tức thất bại!");
  }
};

// NEWS LIST
export const listNews = () => async (dispatch) => {
  try {
    dispatch({ type: NEWS_LIST_REQUEST });
    const { data } = await axios.get(`${server}/news/get-all-news`);
    dispatch({ type: NEWS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEWS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteNews = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${server}/news/delete-news/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: NEWS_DELETE_SUCCESS, payload: data });
    toast.success("Xóa tin tức thành công!");
  } catch (error) {
    toast.success("Xóa tin tức thất bại!");
  }
};

// SINGLE PRODUCT
export const listNewsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_DETAILS_REQUEST });
    const { data } = await axios.get(`${server}/news/get-news/${id}`);
    dispatch({ type: NEWS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEWS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// EDIT PRODUCT
export const newsEdit = (id, data) => async (dispatch) => {
  try {
    console.log();
    dispatch({ type: NEWS_EDIT_REQUEST });
    await axios.put(
      `${server}/news/update-news/${id}`,
      { ...data },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: NEWS_EDIT_SUCCESS });
    dispatch({ type: RESET_IMG });

    toast.success("Chỉnh sửa thông tin tin tức thành công!");
  } catch (error) {
    toast.error("Chỉnh sửa thông tin tin tức thất bại!");
    dispatch({
      type: NEWS_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
