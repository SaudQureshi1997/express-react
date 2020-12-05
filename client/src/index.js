/* eslint-disable import/first */
require("dotenv").config();
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import Cookie from "js-cookie";
import { Provider } from "react-redux";
import store from "./redux/store";

window.Cookie = Cookie;

window.axios = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  headers: {
    Authorization: `Bearer ${Cookie.get("token")}`,
  },
  timeout: 10000,
});

window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.hasOwnProperty("response")) {
      console.log(error);
    }
    if (error.response.status === 401) {
      Cookie.remove("token");
      window.location.replace.push("/");
    }
    throw error;
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
