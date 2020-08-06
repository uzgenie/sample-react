import { notification } from "antd";
import * as types from "../constants";
import { request } from "../../../helper/axiosRequest";
import { ServerUrl } from "../../../helper/helper";

export function getUsers(filter) {
  filter = filter ? filter : {};
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_ADMIN_USERS_ATTEMPT });
      const res = await request({
        auth: true,
        method: "GET",
        url: `${ServerUrl}/v1/users/all?filter=${JSON.stringify(filter)}`,
      });
      dispatch({ type: types.GET_ADMIN_USERS_SUCCESS, payload: res.data });
    } catch (err) {
      notifyError(err);
      dispatch({ type: types.GET_ADMIN_USERS_FAIL, payload: err });
    }
  };
}

export function getPromoCodes() {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_PROMO_CODES_ATTEMPT });
      const res = await request({
        auth: true,
        method: "GET",
        url: `${ServerUrl}/v1/promoCode/all`,
      });
      dispatch({ type: types.GET_PROMO_CODES_SUCCESS, payload: res.data });
    } catch (err) {
      notifyError(err);
      dispatch({ type: types.GET_PROMO_CODES_FAIL, payload: err });
      throw err;
    }
  };
}

export function createPromoCode(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: types.CREATE_PROMO_CODES_ATTEMPT });
      const res = await request({
        auth: true,
        method: "POST",
        url: `${ServerUrl}/v1/promoCode/create`,
        data,
      });
      dispatch({ type: types.CREATE_PROMO_CODES_SUCCESS, payload: res.data });
    } catch (err) {
      notifyError(err);
      dispatch({ type: types.CREATE_PROMO_CODES_FAIL, payload: err });
      throw err;
    }
  };
}

export function updatePromoCode(data, id) {
  return async (dispatch) => {
    try {
      dispatch({ type: types.UPDATE_PROMO_CODES_ATTEMPT });
      const res = await request({
        auth: true,
        method: "POST",
        url: `${ServerUrl}/v1/promoCode/update/${id}`,
        data,
      });
      dispatch({ type: types.UPDATE_PROMO_CODES_SUCCESS, payload: res.data });
    } catch (err) {
      notifyError(err);
      dispatch({ type: types.UPDATE_PROMO_CODES_FAIL, payload: err });
      throw err;
    }
  };
}

export function deletePromoCode(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: types.DELETE_PROMO_CODES_ATTEMPT });
      const res = await request({
        auth: true,
        method: "POST",
        url: `${ServerUrl}/v1/promoCode/delete/${id}`,
      });
      dispatch({ type: types.DELETE_PROMO_CODES_SUCCESS, payload: { id } });
    } catch (err) {
      notifyError(err);
      dispatch({ type: types.DELETE_PROMO_CODES_FAIL, payload: err });
      throw err;
    }
  };
}

export async function getSinglePromoCode(id) {
  try {
    const res = await request({
      auth: true,
      method: "GET",
      url: `${ServerUrl}/v1/promoCode/single/${id}`,
    });
    return res.data;
  } catch (err) {
    notifyError(err);
    throw err;
  }
}

export function assignPromo(id, data) {
  return async (dispatch) => {
    try {
      const res = await request({
        auth: true,
        method: "POST",
        url: `${ServerUrl}/v1/promoCode/assignToUsers/${id}`,
        data,
      });
      notification.success({ message: "Sent Promo Codes to users" });
      dispatch({
        type: types.ASSIGN_PROMO_SUCCESS,
        payload: { id, users: data.users },
      });
      return res.data;
    } catch (err) {
      notifyError(err);
      throw err;
    }
  };
}

function notifyError(err) {
  notification.error({
    message: err?.response?.data?.error?.name,
    description: err?.response?.data?.error?.message,
  });
}

export function notifySuccess(message, description) {
  notification.success({
    message,
    description,
  });
}

export function notificationBroadcasting(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: types.NOTIFICATION_BROADCASTING_ATTEMPT });
      const res = await request({
        auth: true,
        method: "POST",
        url: `${ServerUrl}/v1/admin/createEmails`,
        data,
      });
      dispatch({
        type: types.NOTIFICATION_BROADCASTING_SUCCESS,
        payload: res.data,
      });
      notifySuccess("Sent Message", "message sent to " + data.sendTo);
    } catch (err) {
      notifyError(err);
      dispatch({ type: types.NOTIFICATION_BROADCASTING_FAIL, payload: err });
      throw err;
    }
  };
}

export function updateActiveStatus(data) {
  return async (dispatch) => {
    try {
      const res = await request({
        auth: true,
        method: "GET",
        url: `${ServerUrl}/v1/admin/updateStatus/${data.id}`,
      });
      dispatch({
        type: types.UPDATE_ACTIVE_STATUS,
        payload: { ...data, isActive: !data.isActive },
      });
      notifySuccess(
        "Status Updated",
        "user status updated to  " + data.isActive ? "Activate" : "Deactivate"
      );
    } catch (err) {
      notifyError(err);
      throw err;
    }
  };
}
