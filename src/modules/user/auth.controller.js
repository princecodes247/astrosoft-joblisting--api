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
      const { user, tokens } = await AuthService.signUp(req.body);
      return res.status(201).json({ user, tokens });
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }

  async signIn(req, res, next) {
    console.log("Calling Sign-In endpoint with body: ", req.body);
    try {
      const { email, password } = req.body;
      const { user, tokens } = await AuthService.signIn(email, password);

      const { accessToken, refreshToken } = tokens;

      res.cookie(REFRESH_TOKEN, refreshToken, refreshCookieOptions);
      res.cookie(ACCESS_TOKEN, accessToken, cookieOptions);
      return res.json({ user, accessToken, refreshToken }).status(200);
    } catch (e) {
      console.error("🔥 error: %o", e);
      return next(e);
    }
  }
}

module.exports = new AuthController();
