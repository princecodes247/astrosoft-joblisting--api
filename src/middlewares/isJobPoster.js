const Job = require("../modules/job/job.model");

async function isJobPoster(req, res, next) {
  try {
    const job = await Job.findOne({ _id: req.params.jobId });

    if (job.poster === req.$user) {
      throw new Error("Unauthorized access: User not found");
    }

    next();
    return null;
  } catch (error) {
    return next(error);
  }
}

module.exports = isJobPoster;
