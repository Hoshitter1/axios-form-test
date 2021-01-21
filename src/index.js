import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

// For manipulating request and response and errors globally
axios.interceptors.request.use(
  (request) => {
    console.log("interceptors", request);
    //   impelement reruen request otherwise it blocks the request
    //   Edit request config such as header
    return request;
  },
  (error) => {
    console.log(error);
    // Use promise to keep the order of executions
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    //   impelement reruen request otherwise it blocks the request
    //   Edit request config such as header
    return response;
  },
  (error) => {
    console.log(error);
    // Use promise to keep the order of executions
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
