const express = require("express");
const { role } = require("../../config");
const config = require("../../config");
const { isAuth } = require("../../middlewares");
const UserController = require("./user.controller");

const { Router } = express;

const route = Router();

module.exports = (app) => {
  app.use(`/api/v1/users`, route);

  route.get("/", (req, res) => {
    res.send("hi user");
  });

  route.get("/me", isAuth(), UserController.getUserDetails);
  route.get("/employers", UserController.getEmployers);
  route.get("/candidates", UserController.getCandidates);
  route.get("/:userId", UserController.getOne);
  route.post("/update", isAuth(), UserController.updateUserProfile);
};
