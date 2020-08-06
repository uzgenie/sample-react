export const BillServer = "https://testing.egenienext.com:3020";

export const billEndpoints = {
  get_all_bills: {
    endpoint: BillServer + "/v1/bill/all",
    method: "GET",
    authentication_required: true,
    onLoad: { type: "BILLS_DATA_LOADING" },
    onSuccess: { type: "SET_ALL_BILLS", payload: null },
  },
  create_bill: {
    endpoint: BillServer + "/v1/bill/create/",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "BILLS_DATA_LOADING" },
  },
  delete_bill: {
    endpoint: BillServer + "/v1/bill/delete/",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "BILLS_DATA_LOADING" },
  },
  update_bill: {
    endpoint: BillServer + "/v1/bill/update/",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "BILLS_DATA_LOADING" },
  },
  update_bill: {
    endpoint: BillServer + "/v1/billNo/check/",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "BILLS_DATA_LOADING" },
  },
};
