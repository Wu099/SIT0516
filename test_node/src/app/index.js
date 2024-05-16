const Koa = require("koa");
const session = require("koa-session");
const errorHandler = require("./error-handle");
const bodyparser = require("koa-bodyparser");
const cors = require("@koa/cors");
const userRoutes = require("../router/index");
const session_signed_key = ["appletSystem"];

const app = new Koa();
app.use(
  cors({
    credentials: true,
  })
);
const CONFIG = {
  name: "sessionId",
  maxAge: 180000, //3分钟180000
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: true,
  key: "sessionId",
};
app.keys = session_signed_key;
app.use(session(CONFIG, app));
app.on("error", errorHandler);
app.use(cors());
app.use(bodyparser());
userRoutes(app);

module.exports = app;
