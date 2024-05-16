const NAME_OR_PASSWORD_IS_REQUIRED = "name_or_password_is_required"; //账号或者密码需要
const USER_NAME_ALREADY_REGISTER = "user_name_already_register"; //账号已经注册了
const PASSWORD_IS_FALSE = "password_is_false"; //密码错误
const USER_NAME_NOT_ALREADY_REGISTER = "user_name_not_already_register"; //使用的账号已经注册了
const NOT_FOUND_TOKEN = "NOT_FOUND_TOKEN"; //没有登录token，请登录
const UNPERIMISSION = "UNPERIMISSION"; //不被允许这个操作
const REGISTERDATA_IS_REQUIRED = "registerdata_is_required"; //注册信息缺少
const COOKIE_IS_REQUIRED = "cookie_is_required"; //登录模块中的图片验证码cookie信息缺少
const SVG_COOKIE_IS_TIMEOUT = "svg_cookie_is_timeout"; //图片验证码过期了
const SVG_COOKIE_IS_FALSE = "svg_cookie_is_false"; //图片验证码错误
const UNAUTHORIZATION = "unauthorizatoken"; //无效的token
module.exports = {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_NAME_ALREADY_REGISTER,
  PASSWORD_IS_FALSE,
  USER_NAME_NOT_ALREADY_REGISTER,
  NOT_FOUND_TOKEN,
  UNPERIMISSION,
  REGISTERDATA_IS_REQUIRED,
  COOKIE_IS_REQUIRED,
  SVG_COOKIE_IS_TIMEOUT,
  SVG_COOKIE_IS_FALSE,
  UNAUTHORIZATION,
};
