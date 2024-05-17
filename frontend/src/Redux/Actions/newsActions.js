import {
  NEWS_DETAILS_FAIL,
  NEWS_DETAILS_REQUEST,
  NEWS_DETAILS_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
} from "../Constants/newsContants";

import { server } from "../../server";

import axios from "axios";

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
