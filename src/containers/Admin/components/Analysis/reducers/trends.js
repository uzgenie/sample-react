import * as actions from "./../constants";

let initial = { inventory_trend: null,sale_and_profit:null,net_profit:null };
export default function (state = initial, action) {
  switch (action.type) {
    case actions.Trends_API_Data_loaded: {
      let { setTo, data } = action.payload;
      let newState = { ...state};
      newState[setTo] = data;
      return newState;
    }
    case actions.Trends_API_Data_loading: {
     
      
      let newState = { ...state};
      newState[action.payload2] = null; 
      return newState;
    }
    default:
      return state;
  }
}
