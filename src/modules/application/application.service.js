const CRUD = require("../crud.factory");
const ApplicationModel = require("./application.model");

class ApplicationService extends CRUD {
  async getByJob(jobId, page = 1, limit = 100) {
    const result = await this._paginatedQuery({ limit, page }, { job: jobId });

    return result;
  }
}

module.exports = new ApplicationService(ApplicationModel, "Application");
