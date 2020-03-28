import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import restaurant from "./restaurant";
import product from "./products";
import cart from "./cart";
import order from "./order";
// import socialAuth from "./socialAuth";

export default combineReducers({
  alert,
  auth,
  profile,
  restaurant,
  product,
  cart,
  order
});
