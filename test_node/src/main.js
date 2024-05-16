const path = require("path");
const static = require("koa-static");
const app = require("./app");
const config = require("./app/config");
app.use(static(path.join(__dirname, "/public/")));
app.listen(8808, () => {
  console.log(`服务器${config.APP_PORT}启动成功`);
});
