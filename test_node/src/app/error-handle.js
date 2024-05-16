const errorTypes = require("../constants/error-type.js");
const errorHandler = (error, ctx) => {
  let status, message, code;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或者密码不能为空";
      code = 208;
      break;
    case errorTypes.USER_NAME_ALREADY_REGISTER:
      status = 406;
      message = "用户名已经被注册了";
      code = 208;
      break;
    case errorTypes.PASSWORD_IS_FALSE:
      status = 403;
      message = "密码错误";
      code = 208;
      break;
    case errorTypes.USER_NAME_NOT_ALREADY_REGISTER:
      status = 409;
      message = "用户名不存在，请注册";
      code = 208;
      break;
    case errorTypes.NOT_FOUND_TOKEN:
      status = 405;
      message = "没有token";
      code = 300;
      break;
    case errorTypes.UNPERIMISSION:
      status = 408;
      message = "你没有权限";
      code = 300;
      break;
    case errorTypes.REGISTERDATA_IS_REQUIRED:
      status = 410;
      message = "缺少注册的信息不足,请确保信息完整";
      code = 300;
      break;
    case errorTypes.SVG_COOKIE_IS_FALSE:
      status = 408;
      message = "验证码错误";
      code = 310;
      break;
    case errorTypes.SVG_COOKIE_IS_TIMEOUT:
      status = 408;
      message = "图片验证码过期了,重试";
      code = 310;
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 405;
      message = "无效的token,请重新登录";
      code = 308;
      break;
    default:
      status = 404;
      message = "找不到对应文件";
      code = 300;
  }
  ctx.status = status;
  ctx.body = {
    message,
    code,
  };
};
module.exports = errorHandler;
