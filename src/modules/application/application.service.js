const CRUD = require("../crud.factory");
const ApplicationModel = require("./application.model");

class ApplicationService extends CRUD {
  async getByJob(jobId, page = 1, limit = 100) {
    const result = await this._paginatedQuery({ limit, page }, { job: jobId });

    return result;
  }

  async getApplication(userId, page = 1, limit = 10) {}
  async getRecentApplications(userId, page = 1, limit = 10) {}
}

module.exports = new ApplicationService(ApplicationModel, "Application");
