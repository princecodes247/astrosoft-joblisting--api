const multer = require("multer");
const AWSUtil = require("../../utils/aws");
const ApplicationService = require("./application.service");
const upload = multer();

const apply = async (req, res, next) => {
  try {
    // const imagePath = req.files[0].path;
    // const blob = fs.readFileSync(imagePath);

    const resume = await AWSUtil.uploadFile(req.body.file);
    // Create a dummy proxy of req.body
    const body = {
      ...req.body,
      user: req.$user._id,
      resume: resume.Location,
    };
    console.log(
      "🚀 ~ file: application.controller.js ~ line 57 ~ apply ~ body",
      body.resume
    );

    const result = await ApplicationService.create(body);
    return res.json({ result }).status(200);
  } catch (e) {
    console.error("🔥 error: ", e);
    return next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const applications = await ApplicationService.getAll();
    return res.json(applications).status(200);
  } catch (e) {
    return next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const application = await ApplicationService.getOne(
      req.params.applicationId
    );
    return res.json(application).status(200);
  } catch (e) {
    return next(e);
  }
};
const getJobApplications = async (req, res, next) => {
  try {
    console.log("getByJob", req.params.jobId);
    const application = await ApplicationService.getByJob(req.params.jobId);
    return res.json(application).status(200);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  apply,
  getAll,
  getOne,
  getJobApplications,
};
