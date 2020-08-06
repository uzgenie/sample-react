import * as types from "../constants";

const initial = {
  isLoading: false,
  data: [],
  error: null,
};
export default function (state = initial, action) {
  switch (action.type) {
    case types.GET_ADMIN_USERS_ATTEMPT:
      return { ...state, isLoading: true };
    case types.GET_ADMIN_USERS_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case types.GET_ADMIN_USERS_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case types.ASSIGN_PROMO_SUCCESS:
      let newDataUpdateList = [...state.data];

      action.payload.users.forEach((item, index) => {
        let listIndex = newDataUpdateList.map((item) => item.id).indexOf(item);
        newDataUpdateList[listIndex].promoCodeId = action.payload.id;
      });

      return {
        ...state,
        data: newDataUpdateList,
      };
    case types.UPDATE_ACTIVE_STATUS:
      const newData = [...state.data];
      const ids = state.data.map((item) => item.id);
      const index = ids.indexOf(action.payload.id);
      newData.splice(index, 1, action.payload);
      return { ...state, data: newData };
    default:
      return state;
  }
}
