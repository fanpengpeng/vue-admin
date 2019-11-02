import service from "./interceptors";

/**
 * 获取验证码
 * @param {Object} data
 */
export function GetSMS(data) {
  return service.request({
    url: "/getSms/",
    method: "post",
    data
  });
}

/**
 * 用户注册
 * @param {Object} data
 */
export function Register(data) {
  return service.request({
    url: "/register/",
    method: "post",
    data
  });
}
