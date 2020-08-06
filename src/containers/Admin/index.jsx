import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function Admin() {
  return (
    <Switch>
      <Route component={Dashboard} path="/" />
    </Switch>
  );
}

export default Admin;
