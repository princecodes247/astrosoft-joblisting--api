const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const UserModel = require("./user.model");

const { JWT_SECRET } = require("../../constants/auth.constants");

const signUp = async (userInputDTO) => {
  try {
    console.log("Creating user db record");
    const userRecord = await UserModel.create(userInputDTO);
    console.log("Generating JWT");
    const tokens = generateTokens(userRecord);

    if (!userRecord) {
      throw new Error("User cannot be created");
    }

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");
    return { user, tokens };
  } catch (e) {
    console.log("e.message");
    throw e;
  }
};

const signIn = async (email, password) => {
  const userRecord = await UserModel.findOne({ email });
  if (!userRecord) {
    throw new Error("User not registered");
  }
  /**
   * We use verify = require(bcrypt to prevent 'timing based' attacks
   */
  console.log("Checking password");
  const validPassword = await bcrypt.compare(password, userRecord.password);
  if (validPassword) {
    console.log("Password is valid!");
    console.log("Generating JWT Tokens");
    const tokens = generateTokens(userRecord);

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");
    /**
     * Easy as pie, you don't need passport.js anymore :)
     */
    return { user, tokens };
  }
  throw new Error("Invalid Password");
};

const generateToken = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  /**
   * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into
   * The cool thing is that you can add custom properties a.k.a metadata
   * Here we are adding the userId, role and name
   * Beware that the metadata is and can be decoded without _the secret_
   * but the client cannot craft a JWT to fake a userId
   * because it doesn't have _the secret_ to sign it
   * more information here: https://softwareontheroad.com/you-dont-need-passport
   */
  console.log(`Sign JWT for User ID: ${user._id}`);
  return jwt.sign(
    {
      _id: user._id, // We are gonna use this in the middleware 'isAuth'
      role: user.role,
      name: user.name,
      exp: exp.getTime() / 1000,
    },
    JWT_SECRET
  );
};

const generateTokens = (user) => {
  try {
    console.log(`Generate Access Token: User ID ${user._id}`);
    const accessToken = jwt.sign(
      {
        uid: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        verified: user.isVerified,
      },
      JWT_SECRET,
      {
        expiresIn: "50m",
      }
    );

    console.log(`Generate Refresh Token: User ID ${user._id}`);
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "4w",
    });
    return { accessToken, refreshToken };
  } catch ({ message }) {
    throw new Error(`500---${message}`);
  }
};

module.exports = {
  signUp,
  signIn,
};
