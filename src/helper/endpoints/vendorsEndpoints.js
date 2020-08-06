export const vendorServer = "https://testing.egenienext.com:3005";

export const vendorEndpoints = {
  // get_all_labels: {
  get_vendor_labels: {
    endpoint: vendorServer + "/v1/labels/all",
    method: "GET",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" },
    // onSuccess: { type: "SET_ALL_LABELS", payload: null }
    onSuccess: { type: "SET_VENDOR_LABELS", payload: null }
  },
  // delete_label: {
  delete_vendor_label: {
    endpoint: vendorServer + "/v1/labels/delete/",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  },
  // create_label: {
  create_vendor_label: {
    endpoint: vendorServer + "/v1/labels/createLabel",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  },
  // update_label: {
  update_vendor_label: {
    endpoint: vendorServer + "/v1/labels/update/",
    method: "PATCH",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  },
  add_label_to_vendor: {
    endpoint: vendorServer + "/v1/vendors/update/",
    method: "PATCH",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  },

  add_label_to_vendors: {
    endpoint: vendorServer + "/v1/vendors/bulkUpdate/",
    method: "PATCH",
    authentication_required: true,
    onLoad: { type: "LABELS_DATA_LOADING" }
  }
};
