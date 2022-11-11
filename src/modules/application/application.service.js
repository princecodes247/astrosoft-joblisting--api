const CRUD = require("../crud.factory");
const ApplicationModel = require("./application.model");

class ApplicationService extends CRUD {
  async getByJob(jobId) {
    const result = await this._paginatedQuery(
      { limit: 100, page: 1 },
      { job: jobId }
    );

    return result;
  }
}

module.exports = new ApplicationService(ApplicationModel, "Application");
