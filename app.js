/**
 * Module dependencies.
 */
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const methodOverride = require("method-override");
const routes = require("./src/routes");
const DBLoader = require("./src/config/DBLoader");

const COOKIE_SECRET = process.env.COOKIE_SECRET || "000";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
const ef = dotenv.config();

if (ef.error) {
  console.log("EFFF");
}

// Connect to DB
DBLoader();

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(
  cors({
    origin: "*",
  })
);
console.log(COOKIE_SECRET);
// Some sauce that always add since 2014
// "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
// Maybe not needed anymore ?
app.use(methodOverride());
// Cookie Parser
app.use(cookieParser(COOKIE_SECRET));

// Transforms the raw string of req.body into json
app.use(express.json());

app.use(compression());

// Secure the app by setting various HTTP headers off.
app.use(helmet({ contentSecurityPolicy: false }));

/**
 * Health Check endpoints
 * @TODO Explain why they are here
 */
app.get("/status", (req, res) => {
  res.status(200).end();
});
app.head("/status", (req, res) => {
  res.status(200).end();
});

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.get("/user", (_, res) => {});

app.use("", routes());

// Error Handlers

app.use((err, req, res, next) => {
  /**
   * Handle 401 thrown by express-jwt library
   */
  if (err.name === "UnauthorizedError") {
    return res.status(err.status).json({ message: err.message }).end();
  }
  if (err.code === 11000) {
    const message = Object.keys(err.keyValue).map(
      (key) => `${key}: ${err.keyValue[key]} already exists`
    );
    return res.status(400).json({ message }).end();
  }
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
});

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    `App is running on http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
  console.log("Press CTRL-C to stop");
});

module.exports = app;
