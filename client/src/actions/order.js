import axios from "axios";
import { setAlert } from "./alert";
import { CREATE_ORDER, CREATE_ORDER_ERROR } from "./types";

// history-> redirect back to dashboard
export const createOrder = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/order", formData, config);

    dispatch({
      type: CREATE_ORDER,
      payload: res.data
    });

    dispatch(setAlert("Success Order", "success"));

    history.push("/dashboard");
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    // }
    // dispatch({
    //   type: CREATE_ORDER_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};
