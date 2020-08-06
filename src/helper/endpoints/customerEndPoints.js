export const customerServer = "https://testing.egenienext.com:3014";

export const customerEndpoints = {
  // get_all_labels: {
  get_customer_labels: {
    endpoint: customerServer + "/v1/customers/labels/all",
    method: "GET",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" },
    // onSuccess: { type: "SET_ALL_LABELS", payload: null }
    onSuccess: { type: "SET_CUSTOMER_LABELS", payload: null }
  },
  delete_label: {
    endpoint: customerServer + "/v1/customers/labels/delete/",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  },
  create_label: {
    endpoint: customerServer + "/v1/customers/labels/createLabel",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  },
  update_label: {
    endpoint: customerServer + "/v1/customers/labels/update/",
    method: "PATCH",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  },
  add_label_to_customer: {
    endpoint: customerServer + "/v1/customers/update/",
    method: "PATCH",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  },

  add_label_to_customers: {
    endpoint: customerServer + "/v1/customers/bulkUpdate/",
    method: "PATCH",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  }
};
