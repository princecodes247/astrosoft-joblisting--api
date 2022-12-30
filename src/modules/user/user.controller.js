const UserService = require("./user.service");

class UserController {
  async buyNFT(req, res, next) {
    try {
      const { user, nft } = await UserService.buyNFT(
        req.$user._id,
        req.params.id
      );
      const history = await HistoryService.create({
        user: req.$user._id,
        amount: nft.price,
        type: "buy",
        details: {
          nft: nft._id,
        },
      });
      return res.json({ user, nft, history }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async sellNFT(req, res, next) {}

  async withdraw(req, res, next) {
    try {
      const { user } = await UserService.withdraw(
        req.$user._id,
        req.body.amount
      );
      const history = await HistoryService.create({
        user: req.$user._id,
        amount: req.body.amount,
        type: "withdraw",
        details: {},
      });
      return res.json({ user, history }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async deposit(req, res, next) {
    try {
      const { user } = await UserService.deposit(
        req.$user._id,
        req.body.amount
      );
      const history = await HistoryService.create({
        user: req.$user._id,
        amount: req.body.amount,
        type: "deposit",
        details: {},
      });
      return res.json({ user, history }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

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
      const user = await UserService.getOne(req.params.userId);
      return res.json({ user }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async getUserDetails(req, res) {
    const user = await UserService.getOne(req.$user._id);
    console.log(user);
    return res.json({ user }).status(200);
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
