import {
  GET_RESTAURANTS_PRODUCTS_BY_ID,
  GET_RESTAURANTS_PRODUCTS_BY_ID_ERROR
} from "../actions/types";

const initialState = {
  products: [],
  product: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RESTAURANTS_PRODUCTS_BY_ID:
      return {
        ...state,
        products: payload,
        loading: false
      };
    case GET_RESTAURANTS_PRODUCTS_BY_ID_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
