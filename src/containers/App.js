import React, { Fragment, lazy, Suspense } from "react";
import "react-quill/dist/quill.snow.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { Spin } from "antd";
import { connect } from "react-redux";
import * as queryString from "query-string";
import CustomRoute from "./Forgot-pasword/components/CustomRoute";
import ProtectedRoute from "./ProtectedRoute";
import VerifyEmail from "./Signup/components/email-verification";
import AddCustomer from "./Customers/addCustomer";

const Dashboard = lazy(() => import("./Dashboard"));
const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));
const Forgetpassword = lazy(() => import("./Forgot-pasword"));
const ChangePassword = lazy(() =>
  import("./Forgot-pasword/components/ChangePassword")
);

const App = (props) => {
  const { location } = props;
  let token = "";
  if (
    location.pathname.includes("/customers/editCustomer") &&
    location.search.includes("token=")
  ) {
    token = queryString.parse(location.search).token;
  }
  const darkVars = {
    // "@theme-col-light-blue": "#03001f",
    "@text-color": "#ffffff",
    "@text-color-secondary": "#ffffff",
    "@heading-color": "#fff",
    "@primary-color": "#60c7d8",
    "@link-color": "#60c7d8",
    "@success-color": "#52c41a",
    "@warning-color": "#faad14",
    "@error-color": "#f5222d",
    "@disabled-color": "rgba(0, 0, 0, 0.25)",
    "@border-color-base": "#ccc",
    "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)",
    "@theme-col-light-blue": "#03001b",
    "@background-transparent": "transparent",
    "@background-white": "#fff",
    "@background-gray": "#ddd",
    "@white": "#000",
    "@black": "#fff",
    "@light-gray": "#eee",
    "@section-title-light-gradient-start": "#ebf5f7",
    "@section-title-light-gradient-end": "#00ebf5f7",
    "@sidebar-wrap": "#040021",
    "@dashboard-nav-active-bg": "#0e0c21",
    "@dashboard-navbar-icon-color": "#fff",
    "@tab-content": "#040c30",
    "@thead-bg": "#333333",
    "@item-active-bg": "#333333",
    "@item-hover-bg": "#333333",
    "@filter-gradiant": "#040c30",
  };
  if (
    Object.keys(props.singleUser.data).length &&
    props.singleUser.data.theme
  ) {
    const theme = props.singleUser.data.theme;
    window.less.modifyVars(theme === "dark" ? darkVars : {}).then(() => {
      console.log("Theme updated successfully");
    });
  }

  return (
    <Fragment>
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forget-password" component={Forgetpassword} />
          <Route path="/verifyEmail" component={VerifyEmail} />
          <CustomRoute
            path="/change-password"
            {...props}
            component={ChangePassword}
          />
          {token && (
            <Route
              exact
              path="/customers/editCustomer/:id"
              render={(routeProps) => (
                <AddCustomer token={token} edit={true} {...routeProps} />
              )}
            />
          )}
          {/* <Route path="/" component={Dashboard} /> */}
          <ProtectedRoute path="/" component={Dashboard} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    singleUser: state.getSettingUserSingleData,
  };
}

export default connect(mapStateToProps, {})(withRouter(App));
