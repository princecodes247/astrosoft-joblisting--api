const CRUD = require("../crud.factory");
const JobModel = require("./job.model");

class JobService extends CRUD {
  async getAllByUser(poster, { limit, page }) {
    console.log("nack", poster);
    return this._paginatedQuery({ limit, page }, { poster });
  }
}

module.exports = new JobService(JobModel, "Job");
