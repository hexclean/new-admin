import axios from "axios";
import { setAlert } from "./alert";
import {
  RESTAURANT_PROFILE_ERROR,
  GET_RESTAURANT_PROFILE,
  PROFILE_ERROR,
  GET_RESTAURANTS,
  GET_RESTAURANTS_PRODUCTS_BY_ID,
  GET_RESTAURANTS_PRODUCTS_BY_ID_ERROR
} from "./types";

// Get restaurant profile by ID
export const getRestaurantProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_RESTAURANT_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RESTAURANT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get restaurants
export const getRestaurants = () => async dispatch => {
  try {
    const res = await axios.get("/api/restaurants");

    dispatch({
      type: GET_RESTAURANTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get restaurant products by ID
export const getRestaurantProductById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/restaurant/${userId}`);

    dispatch({
      type: GET_RESTAURANTS_PRODUCTS_BY_ID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_RESTAURANTS_PRODUCTS_BY_ID_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
