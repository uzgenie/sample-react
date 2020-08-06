import * as actions from "./../constants";

let initial = {
  expenses: null,
  sales: null,
  inventory: null,
  Allcategories: null,
  pinning: {},
};
export default function (state = initial, action) {
  switch (action.type) {
    case actions.Sales_API_Data_loaded: {
      let { setTo, data } = action.payload;
      let newState = { ...state };

      newState[setTo] = data;
      return newState;
    }
    case actions.Sales_API_Data_loading: {
      let newState = { ...state };
      newState[action.payload2] = null;
      return newState;
    }

    case "PINING": {
      let newState = { ...state };
      newState.pinning[action.pin] = true;
      return newState;
    }

    case "PINNED": {
      let newState = { ...state };
      delete newState.pinning[action.pin];
      return newState;
    }

    case "Allcategories_loaded": {
      let newState = { ...state };
      newState["Allcategories"] = action.payload;
      return newState;
    }

    default:
      return state;
  }
}
