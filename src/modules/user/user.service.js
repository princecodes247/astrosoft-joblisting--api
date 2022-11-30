const CRUD = require("../crud.factory");
const UserModel = require("./user.model");

class UserService extends CRUD {
  async getEmployers({ limit, page }) {
    return this._paginatedQuery({ limit, page }, { isCompany: true });
  }

  async getCandidates({ limit, page }) {
    return this._paginatedQuery({ limit, page }, { isCompany: false });
  }

  async getUserProfile(userId) {}
  async updateUserProfile(userId) {}
}

module.exports = new UserService(UserModel, "User");
