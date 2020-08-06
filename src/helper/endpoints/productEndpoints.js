import * as productTypes from "../../containers/Products/constants/constants";
export const productServer = "https://testing.egenienext.com:3007";

export const productEndpoints = {
  // delete_product: {
  //     endpoint: productServer + "/v1/labels/delete/",
  //     method: "POST",
  //     authentication_required: true,
  //     onLoad: { type: "LABELS_DATA_LOADING" }
  //   },
  create_product: {
    endpoint: productServer + "/v1/products/create",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "SUBMIT_PRODUCT_ATTEMPT" }
  },
  update_product: {
    endpoint: productServer + "/v1/products/update/",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "SUBMIT_PRODUCT_ATTEMPT" }
  },
  update_status: {
    endpoint: productServer + "/v1/products/create/",
    method: "POST",
    authentication_required: true,
    onLoad: { type: "UPDATE_STATUS_ATTEMPT" }
  },
  // get_all_products: {
  //   endpoint: productServer + "/v1/products/all",
  //   method: "GET",
  //   authentication_required: true,
  //   onLoad: { type: "PRODUCTS_DATA_LOADING" },
  //   onSuccess: { type: "SET_ALL_PRODUCTS", payload: null }
  // },
  get_all_category: {
    endpoint: productServer + "/v1/category/all",
    method: "GET",
    authentication_required: true,
    onLoad: { type: productTypes.GET_CATEGORY_ATTEMPT },
    onSuccess: { type: productTypes.GET_CATEGORY_SUCCESS, payload: null }
  },
  get_all_variant_category: {
    endpoint: productServer + "/v1/category/all",
    method: "GET",
    authentication_required: true,
    onLoad: { type: productTypes.GET_CATEGORY_ATTEMPT },
    onSuccess: {
      type: productTypes.GET_VARIANT_CATEGORY_SUCCESS,
      payload: null
    }
  },
  create_category: {
    endpoint: productServer + "/v1/category/create",
    method: "POST",
    authentication_required: true,
    onLoad: { type: productTypes.SUBMIT_CATEGORY_ATTEMPT },
    onSuccess: { type: productTypes.SUBMIT_CATEGORY_SUCCESS, payload: null }
  },
  get_units: {
    endpoint: productServer + "/v1/unit/all",
    method: "GET",
    authentication_required: true,
    onLoad: { type: productTypes.GET_UNIT_ATTEMPT },
    onSuccess: { type: productTypes.GET_UNIT_SUCCESS, payload: null }
  },
  create_units: {
    endpoint: productServer + "/v1/unit/create",
    method: "POST",
    authentication_required: true,
    onLoad: { type: productTypes.CREATE_UNIT_ATTEMPT },
    onSuccess: { type: productTypes.CREATE_UNIT_ATTEMPT, payload: null }
  },
  update_units: {
    endpoint: productServer + "/v1/unit/update",
    method: "POST",
    authentication_required: true,
    onLoad: { type: productTypes.UPDATE_UNIT_ATTEMPT },
    onSuccess: { type: productTypes.UPDATE_UNIT_ATTEMPT, payload: null }
  },
  get_all_products: {
    endpoint: productServer + "/v1/products/all",
    method: "GET",
    authentication_required: true,
    onLoad: { type: productTypes.GET_PRODUCTS_ATTEMPT },
    onSuccess: { type: productTypes.GET_PRODUCTS_SUCCESS, payload: null }
  },
  get_single_product: {
    endpoint: productServer + "/v1/products",
    method: "GET",
    authentication_required: true,
    onLoad: { type: productTypes.GET_SINGLE_PRODUCT_ATTEMPT },
    onSuccess: { type: productTypes.GET_SINGLE_PRODUCT_SUCCESS, payload: null }
  }
};
