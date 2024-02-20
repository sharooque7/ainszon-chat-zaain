const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const userRouter = require("./router/userRoute");
const conversationRouter = require("./router/conversationRoute");
const friendRouter = require("./router/friendRouter");

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 5000 })
);

if (app.get("env") === "development") {
  app.use((req, res, next) => {
    console.log("Development");
    return next();
  });
}

if (app.get("env") === "Production") {
  app.use((req, res, next) => {
    console.log("Production");
    return next();
  });
}

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.json("Helo from");
});
app.use("/ainszon", userRouter);
app.use("/ainszon", conversationRouter);
app.use("/ainszon", friendRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  // Log the error for debugging purposes
  console.error(error);

  // Send a JSON response with the error details
  res.status(status).json({ error: { message } });
});

module.exports = app;
