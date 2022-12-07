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
  async updateUserProfile(userId, data) {
    // this
    const user = await this.update(userId, data);
    return user;
  }
  async getCompanyDetails(userId) {
    // this
  }
  async getUserDetails(userId) {
    const appliedJobs = await ApplicationService.getApplication(req.$user._id);
  }
}

module.exports = new UserService(UserModel, "User");
