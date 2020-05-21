const express = require("express");
const morgan = require("morgan");
const toursRouter = require("./route/toursRoute");
const UserRouter = require("./route/userRoute");
const app = express();

if (process.env.NODE_ENV === "developments") {
  app.use(morgan("dev"));
}

// ************* Middleware ************** //
app.use(express.json());
app.use(express.static(`${__dirname}`));

app.use((req, res, next) => {
  console.log("log from middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// *************Router************** //
app.use("/api/V0/tours", toursRouter);
app.use("/api/V0/users", UserRouter);

module.exports = app;
