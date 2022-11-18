const JobService = require("./job.service");

const createJob = async (req, res) => {
  try {
    const result = await JobService.create({
      ...req.body,
      poster: req.$user._id,
    });
    return res.json({ result }).status(200);
  } catch (e) {
    console.error("🔥 error: ", e);
    return next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search, limit, page, location, jobType } = req.query;

    const jobs = await JobService.getAll(
      limit,
      page,
      search,
      location,
      jobType
    );
    return res.json(jobs).status(200);
  } catch (e) {
    return next(e);
  }
};

const getMeta = async (req, res, next) => {
  try {
    const { search, limit, page } = req.query;

    const jobs = await JobService.getMeta();
    return res.json(jobs).status(200);
  } catch (e) {
    return next(e);
  }
};

const getAllByUser = async (req, res, next) => {
  try {
    console.log("nacksss");
    const { page, limit } = req.query;
    const jobs = await JobService.getAllByUser(req.$user._id, { page, limit });
    return res.json(jobs).status(200);
  } catch (e) {
    return next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const job = await JobService.getOne(req.params.jobId);
    return res.json(job).status(200);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  createJob,
  getAll,
  getOne,
  getAllByUser,
  getMeta,
};
