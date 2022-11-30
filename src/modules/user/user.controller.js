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
    return res.json({ data: req.$user }).status(200);
  }
}

module.exports = new UserController();
