import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    common: {
      Authorization: "AUTH_TOKEN_FROM_INSTANCE",
    },
  },
});

// This way does not work
// https://github.com/axios/axios/issues/385
// instance.default.headers.common["Authorization"] = "AUTH TOKEN UPDATED";

instance.interceptors.request.use(
  (request) => {
    console.log("hello int", request);
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

export default instance;
