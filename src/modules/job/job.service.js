const CRUD = require("../crud.factory");
const JobModel = require("./job.model");

class JobService extends CRUD {}

module.exports = new JobService(JobModel, "Job");
