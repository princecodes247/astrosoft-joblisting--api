const express = require("express");
const { role } = require("../../config");
const config = require("../../config");
const { isAuth } = require("../../middlewares");
const JobController = require("./job.controller");

const { Router } = express;

const route = Router();

module.exports = (app) => {
  app.use(`/api/v1/jobs`, route);

  route.get("/", isAuth(), JobController.getAll);
  route.post("/", isAuth(), JobController.createJob);
  route.get("/poster", isAuth(), JobController.getAllByUser);
  route.get("/:jobId", JobController.getOne);
};
