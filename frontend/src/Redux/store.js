import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCheckUserBuyReducer,
  productCreateReviewReducer,
  productDetailsReducer,
  productListReducer,
} from "./Reducers/productReducers";
import { newsDetailsReducer, newsListReducer } from "./Reducers/newsReducers";
import { cartReducer } from "./Reducers/cartReducers";
import { wishlistReducer } from "./Reducers/wishlistReducers";
import {
  userDetailsReducer,
  userForgotPasswordReducer,
  userLoginReducer,
  userRegisterReducer,
  userResetPasswordReducer,
  userUpdatePasswordReducer,
  userUpdateProfileReducer,
  userUpdateAddressReducer,
} from "./Reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  refundOrderReducer,
  orderListMyReducer,
  orderPayReducer,
} from "./Reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  productCheckUserBuy: productCheckUserBuyReducer,
  newsList: newsListReducer,
  newsDetails: newsDetailsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdateAddress: userUpdateAddressReducer,
  userResetPassword: userResetPasswordReducer,
  userUpdatePasswordReducer: userUpdatePasswordReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  refundOrder: refundOrderReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const wishlistItemsFromLocalStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];
// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
  wishlist: {
    wishlistItems: wishlistItemsFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
