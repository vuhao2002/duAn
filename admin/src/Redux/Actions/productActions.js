import {
  CREATE_PRODUCT_SUCCESS,
  DELETE_IMG_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  RESET_IMG,
  UPLOAD_IMG_FAIL,
  UPLOAD_IMG_REQUEST,
  UPLOAD_IMG_SUCCESS,
} from "../Constants/productConstants";

import { server } from "../../server";

import { toast } from "react-toastify";

import axios from "axios";
// UPLOAD IMG
export const imgUpload = (dataImg) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMG_REQUEST });
    const formData = new FormData();
    for (var i = 0; i < dataImg.length; i++) {
      formData.append("images", dataImg[i]);
    }
    const { data } = await axios.post(`${server}/upload`, formData, {
      withCredentials: true,
    });
    dispatch({ type: UPLOAD_IMG_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UPLOAD_IMG_FAIL,
      payload: message,
    });
  }
};

// REMOVE IMG
export const deleteImg = (id) => async (dispatch) => {
  const { data } = await axios.delete(`${server}/upload/delete-img/${id}`, {
    withCredentials: true,
  });
  dispatch({ type: DELETE_IMG_SUCCESS, payload: data });
};

// CREATE PRODUCT
export const createProduct = (dataProduct) => async (dispatch) => {
  try {
    console.log(dataProduct);
    await axios.post(`${server}/product/create`, dataProduct, {
      withCredentials: true,
    });
    dispatch({ type: CREATE_PRODUCT_SUCCESS });
    toast.success("Thêm sản phẩm thành công!");
    dispatch({ type: RESET_IMG });
  } catch (error) {
    toast.error("Thêm sản phẩm thất bại!");
  }
};

// PRODUCT LIST
export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`${server}/product/products`, {
      withCredentials: true,
    });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${server}/product/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
    toast.success("Xóa sản phẩm thành công!");
  } catch (error) {
    toast.success("Xóa sản phẩm thất bại!");
  }
};

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${server}/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// EDIT PRODUCT
export const productEdit = (id, data) => async (dispatch) => {
  try {
    console.log();
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    await axios.put(
      `${server}/product/${id}`,
      { ...data },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: PRODUCT_EDIT_SUCCESS });
    dispatch({ type: RESET_IMG });

    toast.success("Chỉnh sửa thông tin sản phẩm thành công!");
  } catch (error) {
    toast.error("Chỉnh sửa thông tin sản phẩm thất bại!");
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
