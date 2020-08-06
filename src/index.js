import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import App from "./containers/App";
// import * as serviceWorker from "./serviceWorker";

import "./assets/styles/index.less";
// import "./assets/styles/rtl.less";
import "rheostat/initialize";
import { ConfigProvider } from "antd";
// import arEG from "antd/es/locale/ar_EG";
import "antd/dist/antd.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {})
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <ConfigProvider direction="ltr" popupPlacement="bottomRight">
        {/* <ConfigProvider
        locale={arEG}
        direction="ltr"
        popupPlacement="bottomRight"
      > */}
        <App />
      </ConfigProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
