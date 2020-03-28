import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

// Get restaurant profile by ID
export const addToCart = (items, product) => dispatch => {
  const cartItems = items.slice();
  console.log("x");
  let productAlreadyInCart = false;
  cartItems.forEach(item => {
    if (item.id === product._id) {
      productAlreadyInCart = true;
      item.count++;
    }
  });
  if (!productAlreadyInCart) {
    cartItems.push({ ...product, count: 1 });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  return dispatch({
    type: ADD_TO_CART,
    payload: {
      cartItems: cartItems
    }
  });
};

// Get restaurant profile by ID
export const removeFromCart = (items, product) => dispatch => {
  const cartItems = items.slice().filter(elm => elm.id !== product._id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  return dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      cartItems
    }
  });
};
