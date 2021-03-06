/**
 * 过滤特殊字符
 */
export function filterSpecilCharacter(str) {
  let pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]",
    "g"
  );
  return str.replace(pattern, "");
}

/**
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return !reg.test(value);
}

/**
 * 验证密码（6 ~ 20位字母 + 数字）
 */
export function validatePassword(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !reg.test(value);
}

/**
 * 验证验证码（6位字母或数字）
 */
export function validateCode(value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value);
}
