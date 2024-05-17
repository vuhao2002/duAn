const authRouter = require("./authRoute");
const shopRouter = require("./shopRoute");
const productRouter = require("./productRoute");
const uploadRouter = require("./uploadRoute");
const orderRouter = require("./orderRoute");
const conversationRouter = require("./conversationRoute");
const newsRouter = require("./newsRoute");
const messageRouter = require("./messageRoute");

function route(app) {
  app.use("/api/user", authRouter);
  app.use("/api/shop", shopRouter);
  app.use("/api/product", productRouter);
  app.use("/api/upload", uploadRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/conversation", conversationRouter);
  app.use("/api/news", newsRouter);
  app.use("/api/message", messageRouter);
}

module.exports = route;
