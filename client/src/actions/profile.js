import axios from "axios";
import { setAlert } from "./alert";
import {
  PROFILE_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  RESTAURANT_PROFILE_ERROR,
  GET_RESTAURANT_PROFILE,
  GET_RESTAURANTS_PRODUCTS,
  GET_RESTAURANTS_PRODUCTS_ERROR,
  CREATE_ORDER,
  CREATE_ORDER_ERROR
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Delivery Adress
// history-> redirect back to dashboard
export const addDeliveryAdress = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      "/api/profile/deliveryadress",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience updated", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
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

// Get restaurants products
export const getRestaurantsProducts = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/restaurant/${userId}`);

    dispatch({
      type: GET_RESTAURANTS_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_RESTAURANTS_PRODUCTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
