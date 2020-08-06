import * as types from "../constants";
import * as _ from "lodash";

const initial = {
  isLoading: false,
  data: [],
  error: null,
};
export default function (state = initial, action) {
  switch (action.type) {
    case types.GET_PROMO_CODES_ATTEMPT:
      return { ...state, isLoading: true };
    case types.GET_PROMO_CODES_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case types.GET_PROMO_CODES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.DELETE_PROMO_CODES_SUCCESS:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
}
