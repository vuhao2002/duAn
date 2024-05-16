import axios from "axios";
import {
  CART_ADD_API,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/cartConstants";

// ADD TO CART API
export const cartAddApi = () => async (dispatch, getState) => {
  dispatch({ type: CART_ADD_API });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const cart = getState().cart.cartItems.map((item) => {
    return {
      _id: item.product,
      count: item.qty,
      color: item.color,
    };
  });
  await axios.post("/api/user/cart", { cart: cart }, config);
};

// ADD TO CART
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: data,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE PRODUCT FROM CART
export const removeFromCart = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
