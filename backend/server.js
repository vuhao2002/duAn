const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const dbConnect = require("./config/dbConnect");
const app = express();
var cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// //config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const route = require("./routes/index");

const morgan = require("morgan");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
dbConnect();

route(app);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
