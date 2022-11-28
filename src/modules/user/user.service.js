const CRUD = require("../crud.factory");
const UserModel = require("./job.model");

class UserService extends CRUD {
  async getEmployers({ limit, page }) {
    return this._paginatedQuery({ limit, page }, { employer: true });
  }

  async getCandidates({ limit, page }) {
    return this._paginatedQuery({ limit, page }, { employer: false });
  }

  async getUserProfile(userId) {}
  async updateUserProfile(userId) {}
}

module.exports = new UserService(UserModel, "User");
