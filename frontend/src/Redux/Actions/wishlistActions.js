import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
} from "../Constants/wishlistConstants";

// ADD TO WISHLIST
export const addToWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: data,
  });
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

// REMOVE PRODUCT FROM WISHLIST
export const removeFromWishlist = (data) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: data._id,
  });
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
  return data;
};
