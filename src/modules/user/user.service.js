const uploadFile = require("../../utils/storage");
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
  async updateUserPhoto(userId, file) {
    // this
    // Make a call to the storage server to upload the file with the storage service
    // Then update the user with the new photo url

    const response = await uploadFile(file, "photo");
    console.log(response.data);
    const user = await this.update(userId, { photo: response.data.url });
  }
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
