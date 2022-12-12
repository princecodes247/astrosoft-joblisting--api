const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const randomstring = require("randomstring");
const UserModel = require("./user.model");

const { JWT_SECRET } = require("../../constants/auth.constants");
const sendEmail = require("../../utils/mailer");

const signUp = async (userInputDTO) => {
  try {
    console.log("Creating user db record");
    const otp = await randomstring.generate({
      length: 6,
      charset: "numeric",
    });
    const userRecord = await UserModel.create({ ...userInputDTO, otp });
    console.log("Generating JWT");
    const token = generateToken(userRecord);
    sendEmail({
      to: userRecord.email,
      subject: "OTP for your account",
      text: `Your OTP is ${otp}, 
      Please use this OTP to verify your account
      Click here to verify your account
      ${process?.env?.CLIENT_URL}/verify/${userRecord._id}
      `,
    });
    if (!userRecord) {
      throw new Error("User cannot be created");
    }

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");
    Reflect.deleteProperty(user, "otp");
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
    Reflect.deleteProperty(user, "otp");
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
      expiresIn: "5000w",
    }
  );
};

const verifyOTP = async (_id, otp) => {
  const userRecord = await UserModel.findOne({
    _id,
    otp,
  });
  if (!userRecord) {
    throw new Error("Invalid OTP");
  }

  userRecord.verified = true;
  await userRecord.save();

  const user = userRecord.toObject();
  Reflect.deleteProperty(user, "password");
  Reflect.deleteProperty(user, "salt");
  Reflect.deleteProperty(user, "otp");
  return user;
};

const forgotPassword = async (email) => {
  const userRecord = await UserModel.findOne({
    email,
  });
  if (!userRecord || !userRecord.verified) {
    throw new Error("User not registered");
  }

  const otp = await randomstring.generate({
    length: 6,
    charset: "numeric",
  });

  userRecord.otp = otp;
  await userRecord.save();

  sendEmail({
    to: userRecord.email,
    subject: "OTP for your account",
    text: `Your OTP is ${otp},
    Please use this OTP to reset your password
    Click here to reset your password
    ${process?.env?.CLIENT_URL}/reset-password/${userRecord._id}
    `,
  });

  return true;
};

module.exports = {
  signUp,
  signIn,
  verifyOTP,
};
