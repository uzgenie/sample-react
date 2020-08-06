import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import { Spin } from "antd";
import jwtDecode from "jwt-decode";

function Protected({ history, component: Component, authenticate, ...rest }) {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    try {
      let token = localStorage.getItem("token");
      const role = localStorage.getItem("role") || "user";

      const user = token && jwtDecode(token);
      if (!token || !user) {
        throw new Error("unauthorized");
      }
      if (Date.now() >= user.exp * 1000) {
        throw new Error("unauthrized");
      }
      if (role !== "admin") throw new Error("unauthorized");
      setAuth(true);
    } catch (err) {
      history.push("/login");
    }
  }, []);

  return auth ? (
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

export default withRouter(Protected);
