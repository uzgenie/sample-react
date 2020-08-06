import * as actions from "./../constants";

let initial = {
  inventory_trend: null,
  sale_and_profit: null,
  net_profit: null,
  activeTab: ["main_sales", "sales"],
};
export default function (state = initial, action) {
  switch (action.type) {
    case actions.Trends_API_Data_loaded: {
      let { setTo, data } = action.payload;
      let newState = { ...state };
      newState[setTo] = data;
      return newState;
    }
    case actions.Trends_API_Data_loading: {
      let newState = { ...state };
      newState[action.payload2] = null;
      return newState;
    }

    case "SET_ACTIVE_TAB": {
      let newState = { ...state };
      newState["activeTab"] = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
