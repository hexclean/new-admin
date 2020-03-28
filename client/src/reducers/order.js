import { CREATE_ORDER, CREATE_ORDER_ERROR } from "../actions/types";

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
    case CREATE_ORDER:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case CREATE_ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };

    default:
      return state;
  }
}
