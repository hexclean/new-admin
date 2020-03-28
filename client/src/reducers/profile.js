import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  RESTAURANT_PROFILE_ERROR,
  GET_RESTAURANT_PROFILE,
  GET_RESTAURANTS_PRODUCTS_BY_ID,
  GET_RESTAURANTS_PRODUCTS_BY_ID_ERROR,
  CREATE_ORDER,
  CREATE_ORDER_ERROR
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  product: null,
  products: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case GET_RESTAURANT_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case PROFILE_ERROR:

    case RESTAURANT_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
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
