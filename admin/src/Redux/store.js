import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  editProductReducer,
  productDetailsReducer,
  productListReducer,
  uploadImgReducer,
} from "./Reducers/productReducers";

import {
  editNewsReducer,
  newsDetailsReducer,
  newsListReducer,
} from "./Reducers/newsReducers";
import {
  orderListReducer,
  orderDetailsReducer,
} from "./Reducers/orderReducers";
import {
  branchesReducer,
  createBranchReducer,
} from "./Reducers/branchReducers";
import { dashboardReducer } from "./Reducers/dashboardReducers";

const reducer = combineReducers({
  adminLogin: userLoginReducer,
  userList: userListReducer,
  uploadImg: uploadImgReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  editProduct: editProductReducer,
  newsList: newsListReducer,
  newsDetails: newsDetailsReducer,
  editNews: editNewsReducer,
  createBranch: createBranchReducer,
  branchesList: branchesReducer,
  dashboard: dashboardReducer,
});

// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  adminLogin: {
    adminInfo: userInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
