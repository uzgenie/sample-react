import * as Analysis from "./../constants";
import { requestFactory } from "../../../../../helper/request";

let apiData = {
  get_expenses: "expenses",
  get_sales: "sales",
  get_inventory: "inventory",
  get_inventory_trend: "inventory_trend",
  get_sale_and_profit: "sale_and_profit",
  get_net_profit: "net_profit",
};

let types = {
  get_expenses: [
    Analysis.Sales_API_Data_loading,
    Analysis.Sales_API_Data_loaded,
  ],
  get_sales: [Analysis.Sales_API_Data_loading, Analysis.Sales_API_Data_loaded],
  get_inventory: [
    Analysis.Sales_API_Data_loading,
    Analysis.Sales_API_Data_loaded,
  ],
  get_inventory_trend: [
    Analysis.Trends_API_Data_loading,
    Analysis.Trends_API_Data_loaded,
  ],
  get_sale_and_profit: [
    Analysis.Trends_API_Data_loading,
    Analysis.Trends_API_Data_loaded,
  ],
  get_net_profit: [
    Analysis.Trends_API_Data_loading,
    Analysis.Trends_API_Data_loaded,
  ],
};

export const getAPIData = (type, interval, count, from, to) => {
  let setTo = apiData[type];
  let reduxType = types[type];

  to = to === undefined ? "0000-00-00" : to;
  from = from === undefined ? "0000-00-00" : from;

  if (setTo === undefined || reduxType === undefined) return;

  let requestData = {
    name: type,
    data: {
      from: from,
      to: to,
      interval: interval,
      count: count,
    },
    onLoad: { type: reduxType[0], payload2: setTo },
    onSuccess: (data, dispatch) => {
      dispatch({
        type: reduxType[1],
        payload: { data: data, setTo: apiData[type] },
      });
    },
    onFailure: () => {},
  };
  return requestFactory(Object.assign({}, requestData));
};

export const getProductCategories = () => {
  let requestData = {
    name: "get_all_category_analysis",
    onLoad: { type: "" },
    onSuccess: (data, dispatch) => {
      dispatch({ type: "Allcategories_loaded", payload: data });
    },
    onFailure: () => {},
  };
  return requestFactory(Object.assign({}, requestData));
};
