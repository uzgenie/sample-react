import { combineReducers } from "redux";
import loginReducers from "../containers/Login/reducers";
import dashboardReducers from "../containers/Dashboard/reducers";
import signupReducers from "../containers/Signup/reducers";
import userEmailData from "../containers/Forgot-pasword/reducers";
import vendorsReducers from "../containers/Vendors/reducers";
import productsReducers from "../containers/Products/reducers";
import arabicLanguage from "../containers/Language/index";
import settingsReducers from "../containers/Settings/reducers";
import customerReducers from "../containers/Customers/reducers";
import ordersReducers from "../containers/Orders/reducers";
import employeesReducers from "../containers/Employees/reducers";
import billsReducers from "../containers/Bills/reducers";
import analysisReducers from "../containers/Analysis/reducers";
import adminReducers from "../containers/Admin/reducers";
import reportsReducers from "../containers/Reports/reducers";
const rootReducer = combineReducers({
  ...loginReducers,
  ...dashboardReducers,
  ...signupReducers,
  ...userEmailData,
  ...vendorsReducers,
  ...productsReducers,
  ...arabicLanguage,
  ...settingsReducers,
  ...customerReducers,
  ...ordersReducers,
  ...employeesReducers,
  ...billsReducers,
  ...analysisReducers,
  ...adminReducers,
  ...reportsReducers,
});

export default rootReducer;
