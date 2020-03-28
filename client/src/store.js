import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
  cart: {
    items: []
  }
};
// localStorage.removeItem("cartItems");
// console.log(localStorage.getItem("cartItems"));
if (localStorage.getItem("cartItems")) {
  initialState.cart = { items: JSON.parse(localStorage.getItem("cartItems")) };
}

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
