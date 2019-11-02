import axios from "axios";
import { Message } from "element-ui";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devAPI";

const baseConfig = {
  baseURL: BASEURL,
  timeout: 10000
};

const service = axios.create(baseConfig);

// 请求拦截器
service.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  function(response) {
    let data = response.data;
    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    }
    return data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default service;
