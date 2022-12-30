const CollectionService = require("./collection.service");

const createCollection = async (req, res) => {
  try {
    const result = await CollectionService.create({
      ...req.body,
    });
    return res.json({ result }).status(200);
  } catch (e) {
    console.error("🔥 error: ", e);
    return next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search, limit, page, sort, nftType } = req.query;

    const collections = await CollectionService.getAll({
      limit,
      page,
      search,
      nftType,
      sort,
    });
    return res.json(collections).status(200);
  } catch (e) {
    return next(e);
  }
};

const getMeta = async (req, res, next) => {
  try {
    const collections = await CollectionService.getMeta();
    return res.json(collections).status(200);
  } catch (e) {
    return next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const collection = await CollectionService.getOne(req.params.nftId);
    return res.json(collection).status(200);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  createCollection,
  getAll,
  getOne,
  getMeta,
};
