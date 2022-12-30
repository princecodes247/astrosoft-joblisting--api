const express = require("express");
const { role } = require("../../config");
const config = require("../../config");
const { isAuth } = require("../../middlewares");
const CollectionController = require("./collection.controller");

const { Router } = express;

const route = Router();

module.exports = (app) => {
  app.use(`/api/v1/nft`, route);

  route.get("/", CollectionController.getAll);
  route.get("/meta", isAuth(), CollectionController.getMeta);
  route.post("/", isAuth(), CollectionController.createCollection);
  route.get("/:nftId", CollectionController.getOne);
};
