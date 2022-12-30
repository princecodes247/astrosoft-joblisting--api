const express = require("express");
const { role } = require("../../config");
const config = require("../../config");
const { isAuth } = require("../../middlewares");
const HistoryController = require("./history.controller");

const { Router } = express;

const route = Router();

module.exports = (app) => {
  app.use(`/api/v1/history`, route);

  route.post("/", isAuth(), HistoryController.create);
  route.get("/", isAuth(), HistoryController.getHistory);
  route.get("/admin", isAuth(), HistoryController.getAll);
  route.get("/admin/:userId", HistoryController.getAdminHistory);
};
