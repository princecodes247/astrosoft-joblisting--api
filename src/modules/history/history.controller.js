const multer = require("multer");
const AWSUtil = require("../../utils/aws");
const HistoryService = require("./history.service");
const upload = multer();

const create = async (req, res, next) => {
  try {
    // const imagePath = req.files[0].path;
    // const blob = fs.readFileSync(imagePath);

    const resume = await AWSUtil.uploadFile(req.body.file);
    // Create a dummy proxy of req.body
    const body = {
      ...req.body,
      user: req.$user._id,
    };

    const result = await HistoryService.create(body);
    return res.json({ result }).status(200);
  } catch (e) {
    console.error("🔥 error: ", e);
    return next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const history = await HistoryService.getAll();
    return res.json(history).status(200);
  } catch (e) {
    return next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const history = await HistoryService.getOne(req.params.historyId);
    return res.json(history).status(200);
  } catch (e) {
    return next(e);
  }
};
const getHistory = async (req, res, next) => {
  try {
    const history = await HistoryService.getHistory(req.$user._id);
    return res.json(history).status(200);
  } catch (e) {
    return next(e);
  }
};

const getAdminHistory = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const history = await HistoryService.getHistory(userId);
    return res.json(history).status(200);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  getHistory,
  getAdminHistory,
};
