const express = require("express");
const { role } = require("../../config");
const config = require("../../config");
const { isAuth } = require("../../middlewares");
const ApplicationController = require("./application.controller");

const { Router } = express;

const route = Router();

module.exports = (app) => {
  app.use(`/api/v1/application`, route);

  route.get("/", isAuth(), ApplicationController.getAll);
  route.post("/", isAuth(), ApplicationController.apply);
  route.get("/job/:jobId", ApplicationController.getJobApplications);
  route.get("/:applicationId", ApplicationController.getOne);
};
