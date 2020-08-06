import React from "react";
import { Route, withRouter } from "react-router-dom";
import { Spin } from "antd";
import jwtDecode from "jwt-decode";
import * as queryString from "query-string";

class ProtectedRoute extends React.Component {
  state = {
    auth: false,
  };
  async componentDidMount() {
    try {
      const { location } = this.props;
      let token = "";
      if (
        location.pathname.includes("/customers/editCustomer") &&
        location.search.includes("token=")
      ) {
        token = queryString.parse(location.search).token;
      } else {
        token = localStorage.getItem("token");
      }
      const user = token && jwtDecode(token);
      if (!token || !user) {
        throw new Error("unauthorized");
      }
      if (Date.now() >= user.exp * 1000) {
        throw new Error("unauthrized");
      }
      this.setState({ auth: true });
    } catch (err) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { component: Component, authenticate, ...rest } = this.props;
    return this.state.auth ? (
      <Route component={Component} {...rest} />
    ) : (
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
    );
  }
}

export default withRouter(ProtectedRoute);
