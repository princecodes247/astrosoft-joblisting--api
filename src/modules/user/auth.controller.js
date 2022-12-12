const AuthService = require("./auth.service");
const {
  ACCESS_TOKEN,
  cookieOptions,
  refreshCookieOptions,
  REFRESH_TOKEN,
} = require("../../constants/auth.constants");

class AuthController {
  async signUp(req, res, next) {
    console.log("Calling Sign-Up endpoint with body: ", req.body);
    try {
      const { user, token } = await AuthService.signUp(req.body);
      return res.status(201).json({ user, token });
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async signIn(req, res, next) {
    console.log("Calling Sign-In endpoint with body: ", req.body);
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.signIn(email, password);

      return res.json({ user, token }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async verifyOTP(req, res, next) {
    console.log("Calling verifyOTP endpoint with body: ", req.body);
    try {
      const { id } = req.params;
      const { otp = "000" } = req.body;
      const { user, token } = await AuthService.verifyOTP(id, otp);
      return res.status(201).json({ user, token });
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }
}

module.exports = new AuthController();
