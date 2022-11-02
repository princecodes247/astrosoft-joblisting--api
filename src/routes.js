const { Router } = require("express");
const auth = require("./modules/user/auth.route");
const user = require("./modules/user/user.route");
const job = require("./modules/job/job.route");

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  auth(app);
  user(app);
  job(app);

  return app;
};
