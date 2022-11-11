const JobService = require("./job.service");

const createJob = async (req, res) => {
  try {
    const result = await JobService.create(req.body);
    return res.json({ result }).status(200);
  } catch (e) {
    console.error("🔥 error: ", e);
    return next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search } = req.query;
    const jobs = await JobService.getAll(search);
    return res.json(jobs).status(200);
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const job = await JobService.getOne(req.params.jobId);
    return res.json(job).status(200);
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return next(e);
  }
};

module.exports = {
  createJob,
  getAll,
  getOne,
};
