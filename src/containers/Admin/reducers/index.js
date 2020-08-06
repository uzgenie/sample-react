import getUsersReducers from "./getUsersReducer";
import getPromoCodesReducer from "./getPromoCodesReducer";

const reducers = {
  adminUsers: getUsersReducers,
  promoCodes: getPromoCodesReducer,
};

export default reducers;
