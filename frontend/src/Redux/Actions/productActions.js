import axios from "axios";
import {
  PRODUCT_CHECK_USER_BUY_FAIL,
  PRODUCT_CHECK_USER_BUY_REQUEST,
  PRODUCT_CHECK_USER_BUY_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/productConstants";
import { logout } from "./userActions";

import { server } from "../../server";

import { toast } from "react-toastify";

// PRODUCT LIST
export const listProduct = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`${server}/product/category/${keyword}`);
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

// PRODUCT REVIEW CREATE
export const createProductReview =
  (rating, comment, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
      const { data } = await axios.put(
        `${server}/product/rating`,
        {
          rating,
          comment,
          productId,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Bình luận thành công!");
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not Authorized token expired, Please Login again.") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

// PRODUCT CHECK USER BUY
export const productCheckUser = (prodId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CHECK_USER_BUY_REQUEST });
    await axios.get(`${server}/product/check-user/${prodId}`, {
      withCredentials: true,
    });
    dispatch({ type: PRODUCT_CHECK_USER_BUY_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CHECK_USER_BUY_FAIL,
      payload: message,
    });
  }
};
