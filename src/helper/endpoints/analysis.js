import { ServerUrlAnalysis, ServerUrlProduct, ServerUrl } from "./../helper";
import * as Analysis from "../../containers/Analysis/constants";

export const AnalysisEndPoints = {
  get_expenses: {
    endpoint: ServerUrlAnalysis + "/v1/analysis/expenses",
    method: "POST",
    authentication_required: true,
    //onLoad: { type: "SUBMIT_SETTINGS_USER_PROFILE_ATTEMPT" },
  },
  get_sales: {
    endpoint: ServerUrlAnalysis + "/v1/analysis/sales",
    method: "POST",
    authentication_required: true,
    //onLoad: { type: "SUBMIT_SETTINGS_USER_PROFILE_ATTEMPT" },
  },
  get_inventory: {
    endpoint: ServerUrlAnalysis + "/v1/analysis/inventory",
    method: "POST",
    authentication_required: true,
    //onLoad: { type: "SUBMIT_SETTINGS_USER_PROFILE_ATTEMPT" },
  },

  get_inventory_trend: {
    endpoint: ServerUrlAnalysis + "/v1/analysis/inventory",
    method: "POST",
    authentication_required: true,
    //onLoad: { type: "SUBMIT_SETTINGS_USER_PROFILE_ATTEMPT" },
  },

  get_sale_and_profit: {
    endpoint: ServerUrlAnalysis + "/v1/analysis/salesAndExpenses",
    method: "POST",
    authentication_required: true,
    //onLoad: { type: "SUBMIT_SETTINGS_USER_PROFILE_ATTEMPT" },
  },

  get_net_profit: {
    endpoint: ServerUrlAnalysis + "/v1/analysis/netProfit",
    method: "POST",
    authentication_required: true,
    //onLoad: { type: "SUBMIT_SETTINGS_USER_PROFILE_ATTEMPT" },
  },
  get_all_category_analysis: {
    endpoint: ServerUrlProduct + "/v1/category/all",
    method: "GET",
    authentication_required: true,
  },
  pin_to_dashboard: {
    endpoint: ServerUrl + "/v1/users/pinDashboard",
    method: "POST",
    authentication_required: true,
  },
  get_report: {
    endpoint: ServerUrlAnalysis + "/v1/reports/data",
    method: "POST",
    authentication_required: true,
    //onLoad: { type: "SUBMIT_SETTINGS_USER_PROFILE_ATTEMPT" },
  },
};
