const express = require("express");
const { role } = require("../../config");
const config = require("../../config");
const { isAuth } = require("../../middlewares");
const UserController = require("./user.controller");

const { Router } = express;

const route = Router();

module.exports = (app) => {
  app.use(`/api/v1/user`, route);

  route.get("/", (req, res) => {
    res.send("hi user");
  });
  route.get("/me", isAuth(), UserController.getUserDetails);
};
