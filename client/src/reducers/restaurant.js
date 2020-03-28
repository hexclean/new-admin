import {
  GET_RESTAURANTS,
  RESTAURANTS_ERROR,
  GET_RESTAURANTS_PRODUCTS_BY_ID,
  GET_RESTAURANTS_PRODUCTS_BY_ID_ERROR
} from "../actions/types";

const initialState = {
  restaurants: [],
  restaurant: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: payload,
        loading: false
      };
    case RESTAURANTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
