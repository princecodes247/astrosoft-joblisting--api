const UserService = require("./user.service");

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAll(req.body.page, req.body.limit);
      return res.json({ users }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async getEmployers(req, res, next) {
    try {
      const employers = await UserService.getEmployers({
        page: req.body.page,
        limit: req.body.limit,
      });
      return res.json({ employers }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async getCandidates(req, res, next) {
    try {
      const candidates = await UserService.getCandidates({
        page: req.body.page,
        limit: req.body.limit,
      });
      return res.json({ candidates }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const users = await UserService.getOne(req.params.userId);
      return res.json({ users }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async getUserDetails(req, res) {
    let meta;
    if (req.$user.isCompany) {
      meta = await UserService.getCompanyDetails(req.$user._id);
    } else {
      meta = await UserService.getUserDetails(req.$user._id);
    }

    return res.json({ data: req.$user, meta }).status(200);
  }

  async updateUserPhoto(req, res, next) {
    try {
      const user = await UserService.updateUserPhoto(req.$user._id, req.file);
      return res.json({ user }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async updateUserResume(req, res, next) {
    try {
      const user = await UserService.updateUserResume(req.$user._id, req.file);
      return res.json({ user }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async updateUserProfile(req, res, next) {
    try {
      const user = await UserService.updateUserProfile(req.$user._id, req.body);
      return res.json({ user }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }
}

module.exports = new UserController();
