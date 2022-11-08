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
    const token = generateToken(userRecord);

    if (!userRecord) {
      throw new Error("User cannot be created");
    }

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");
    return { user, token };
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
    const token = generateToken(userRecord);

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");
    /**
     * Easy as pie, you don't need passport.js anymore :)
     */
    return { user, token };
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
    },
    JWT_SECRET,
    {
      expiresIn: "50d",
    }
  );
};

module.exports = {
  signUp,
  signIn,
};
