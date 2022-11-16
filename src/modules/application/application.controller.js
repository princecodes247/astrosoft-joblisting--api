const ApplicationService = require("./application.service");

const apply = async (req, res, next) => {
  try {
    const result = await ApplicationService.create({
      ...req.body,
      user: req.$user._id,
    });
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
