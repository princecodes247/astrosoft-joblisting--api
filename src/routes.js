const { Router } = require("express");
const auth = require("./modules/user/auth.route");
const user = require("./modules/user/user.route");
const collection = require("./modules/collection/collection.route");
const history = require("./modules/history/history.route");

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  auth(app);
  user(app);
  collection(app);
  history(app);

  return app;
};
