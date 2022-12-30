const express = require("express");
const { role } = require("../../config");
const config = require("../../config");
const { isAuth } = require("../../middlewares");
const sendEmail = require("../../utils/mailer");
const UserController = require("./user.controller");

const { Router } = express;

const route = Router();

module.exports = (app) => {
  app.use(`${config.api.prefix}/users`, route);

  route.get("/", (req, res) => {
    res.send("hi user");
    sendEmail();
  });

  route.get("/me", isAuth(), UserController.getUserDetails);
  route.post("/withdraw", isAuth(), UserController.withdraw);
  route.post("/deposit", isAuth(), UserController.deposit);
  route.get("/buy/:id", isAuth(), UserController.buyNFT);
  route.get("/:userId", UserController.getOne);
  route.post("/update-photo", isAuth(), UserController.updateUserPhoto);
  route.post("/update-resume", isAuth(), UserController.updateUserResume);
  route.post("/update", isAuth(), UserController.updateUserProfile);
};
