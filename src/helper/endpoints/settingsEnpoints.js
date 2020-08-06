import * as settingTypes from "../../containers/Settings/constants/constants";
export const settingServer = "https://testing.egenienext.com:3004";

export const settingEndPoints = {
  update_user: {
    endpoint: settingServer + "/v1/users/update",
    method: "POST",
    authentication_required: true,
    //onLoad: { type: "SUBMIT_SETTINGS_USER_PROFILE_ATTEMPT" },
    onLoad: { type: settingTypes.UPDATE_SETTINGS_USER_PROFILE_ATTEMPT },
    onSuccess: {
      type: settingTypes.UPDATE_SETTINGS_USER_PROFILE_SUCCESS,
      payload: null
    }
  },
  get_single_user: {
    endpoint: settingServer + "/v1/users/single",
    method: "GET",
    authentication_required: true,
    onLoad: { type: settingTypes.GET_SETTINGS_USER_PROFILE_ATTEMPT },
    onSuccess: {
      type: settingTypes.GET_SETTINGS_USER_PROFILE_SUCCESS,
      payload: null
    }
  },
  create_addtional_user: {
    endpoint: settingServer + "/v1/additionalUsers/create",
    method: "POST",
    authentication_required: true,
    onLoad: { type: settingTypes.CREATE_ADDITIONAL_USER_ATTEMPT },
    onSuccess: {
      type: settingTypes.CREATE_ADDITIONAL_USER_SUCCESS,
      payload: null
    }
  },
  get_additional_users: {
    endpoint: settingServer + "/v1/additionalUsers/all",
    method: "GET",
    authentication_required: true,
    onLoad: { type: settingTypes.GET_ADDITIONAL_USER_ATTEMPT },
    onSuccess: {
      type: settingTypes.GET_ADDITIONAL_USER_SUCCESS,
      payload: null
    }
  }
  // get_single_additional_user: {
  //   endpoint: settingServer + "/v1/additionalUsers/single",
  //   method: "GET",
  //   authentication_required: true,
  //   onLoad: { type: settingTypes.GET_SINGLE_ADDITIONAL_USER_ATTEMPT },
  //   onSuccess: {
  //     type: settingTypes.GET_SINGLE_ADDITIONAL_USER_SUCCESS,
  //     payload: null
  //   }
  // }
};
