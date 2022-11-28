const CRUD = require("../crud.factory");
const JobModel = require("./job.model");

class JobService extends CRUD {
  async getAllByUser({ limit, page }) {
    console.log("nack", poster);
    return this._paginatedQuery({ limit, page }, { poster });
  }

  async getAll(
    { limit, page, sort, search, location, salary, jobType },
    options = {}
  ) {
    const queryObj = { $text: { $search: search } };

    if ((search && search.trim() == "null") || search.trim().length === 0)
      delete queryObj.$text;

    if (location && location?.trim() != "null" && location?.trim().length !== 0)
      queryObj.location = location?.trim();
    if (jobType && jobType?.trim() != "null" && jobType?.trim().length !== 0)
      queryObj.jobType = jobType?.trim();
    if (salary && salary != "null" && salary.length !== 0)
      queryObj.salary.min = { $gt: salary };

    // queryObj.datePosted = datePosted
    // queryObj.location = location
    let _sort = { createdAt: -1 };
    if (
      sort &&
      sort &&
      sort.trim() != "null" &&
      sort.trim().length !== 0 &&
      sort.trim() == "oldest"
    ) {
      _sort = { createdAt: 1 };
    }
    return this._paginatedQuery({ limit, page, sort: _sort }, queryObj);
  }

  async getMeta() {
    const result = await Promise.all([
      this.Model.find().distinct("location"),
      this.Model.find().distinct("experience"),
      this.Model.aggregate([
        {
          $group: {
            _id: null,
            max: { $max: "$salary.max" },
            min: { $min: "$salary.min" },
          },
        },
      ]),
    ]);
    console.log(result[2][0]);
    result[2] = result[2][0];
    return result;
  }
}

module.exports = new JobService(JobModel, "Job");
