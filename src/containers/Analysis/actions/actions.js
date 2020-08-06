import * as Analysis from "./../constants";
import { requestFactory } from "./../../../helper/request";
import { notification } from "antd";

let pinToDashboardData = {
  sales: {
    name: "sales",
    active: true,
    graphType: "",
  },
  sales_expenses: {
    name: "sales_expenses",
    active: true,
    graphType: "",
  },
  inventory: {
    name: "inventory",
    active: true,
    graphType: "",
  },
  inventory_trend: {
    name: "inventory_trend",
    active: true,
    graphType: "",
  },
  expenses: {
    name: "expenses",
    active: true,
    graphType: "",
  },
  net_profit: {
    name: "net_profit",
    active: true,
    graphType: "",
  },
};

let apiData = {
  get_expenses: "expenses",
  get_sales: "sales",
  get_inventory: "inventory",
  get_inventory_trend: "inventory_trend",
  get_sale_and_profit: "sale_and_profit",
  get_net_profit: "net_profit",
  get_report: "reports",
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
  get_report: [
    Analysis.Reports_API_Data_loading,
    Analysis.Reports_API_Data_loaded,
  ],
};
export const getReportsData = (data) => {
  let setTo = "reports";
  let reduxType = types.get_report;
  let requestData = {
    name: "get_report",
    data: data,
    onLoad: { type: reduxType[0], payload2: setTo },
    onSuccess: (data, dispatch) => {
      console.log("Success Rpts///");
      dispatch({
        type: reduxType[1],
        payload: { data: data, setTo: apiData.get_report },
      });
    },
    onFailure: (dispatch) => {
      console.log("Failed Rpts///");
      dispatch({ type: "RPT_FAIL" });
    },
  };
  return requestFactory(Object.assign({}, requestData));
};
export const getAPIData = (type, interval, count, from, to,categoryId= "") => {
  let setTo = apiData[type];
  let reduxType = types[type];

  to = to === undefined ? "0000-00-00" : to;
  from = from === undefined ? "0000-00-00" : from;

  if (setTo === undefined || reduxType === undefined) return;

  const data = {
    from: from,
    to: to,
    interval: interval,
    count: count,
    categoryId:categoryId
  };
  
  if (data.from === "0000-00-00") delete data.from;
  if (data.to === "0000-00-00") delete data.to;
  let requestData = {
    name: type,
    data,
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

const openNotification = () => {
  notification.success({
    message: "Pinned To Dashboard",
  });
};

const openNotificationFailed = () => {
  notification.error({
    message: "Unable to pin To dashboard. please try again.",
  });
};

export const pinToDashboard = (type, graphType, active = true) => {
  if (pinToDashboardData[type] === undefined) {
    return;
  }
  let data = pinToDashboardData[type];
  data["graphType"] = graphType;
  data["active"] = active;

  let requestData = {
    name: "pin_to_dashboard",
    data: data,
    onLoad: { type: "PINING", pin: type },
    onSuccess: (data, dispatch) => {
      openNotification();
      dispatch({ type: "PINNED", pin: type });
      window.location.reload();
    },
    onFailure: () => {
      openNotificationFailed();
    },
  };
  return requestFactory(Object.assign({}, requestData));
};

export const setActiveTab = (main, child) => {
  return { type: "SET_ACTIVE_TAB", payload: [main, child] };
};
