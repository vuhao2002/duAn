import {
  NEWS_DELETE_SUCCESS,
  NEWS_DETAILS_FAIL,
  NEWS_DETAILS_REQUEST,
  NEWS_DETAILS_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_EDIT_REQUEST,
  NEWS_EDIT_SUCCESS,
  NEWS_EDIT_FAIL,
} from "../Constants/newsContants";

// NEWS LIST
export const newsListReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case NEWS_LIST_REQUEST:
      return { loading: true, news: [] };
    case NEWS_LIST_SUCCESS:
      return {
        loading: false,
        news: action.payload,
      };
    case NEWS_DELETE_SUCCESS:
      return {
        ...state,
        news: state.news.filter((x) => x._id !== action.payload._id),
      };
    case NEWS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SINGLE NEWS
export const newsDetailsReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case NEWS_DETAILS_REQUEST:
      return { ...state, loading: true };
    case NEWS_DETAILS_SUCCESS:
      return { loading: false, item: action.payload };
    case NEWS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// EDIT NEWS
export const editNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWS_EDIT_REQUEST:
      return { ...state, loading: true };
    case NEWS_EDIT_SUCCESS:
      return { loading: false, success: true };
    case NEWS_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
