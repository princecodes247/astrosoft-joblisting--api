const CRUD = require("../crud.factory");
const JobModel = require("./job.model");

class JobService extends CRUD {
  async getAllByUser(poster, { limit, page }) {
    console.log("nack", poster);
    return this._paginatedQuery({ limit, page }, { poster });
  }

  async getMeta() {
    const result = await Promise.all([
      this.Model.find().distinct("location"),
      this.Model.aggregate([
        {
          $group: {
            _id: null,
            max: { $max: "$salary" },
            min: { $min: "$salary" },
          },
        },
      ]),
    ]);

    return result;
  }
}

module.exports = new JobService(JobModel, "Job");
