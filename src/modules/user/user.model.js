const { model, Schema } = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const { randomBytes } = require("crypto");

// Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,

  gender: {
    type: Number,
    enum: [0, 1],
    default: 0,
    required: true,
  },

  isCompany: {
    type: Boolean,
    default: false,
  },

  education: {
    type: Array,
    default: [],
  },

  experience: {
    type: Array,
    default: [],
  },

  social: {
    type: Map,
    of: String,
  },

  cac: String,

  otp: {
    type: String,
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  suspended: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Document middlewares
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.salt = randomBytes(32);
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

// Static methods
UserSchema.statics = {
  async signUp(userInputDTO) {
    try {
      console.log("Creating user db record");
      const userRecord = await this.create(userInputDTO);
      if (!userRecord) {
        throw new Error("User cannot be created");
      }
      console.log("Generating JWT");
      const token = generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } catch (e) {
      console.log("e.message");
      throw e;
    }
  },

  async signIn(email, password) {
    const userRecord = await this.findOne({ email });
    if (!userRecord) {
      throw new Error("User not registered");
    }

    /**
     * We use verify = require(bcrypt to prevent 'timing based' attacks
     * */
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
       * */
      return { user, token };
    }
    throw new Error("Invalid Password");
  },
};

// Instance methods
UserSchema.methods = {
  generateToken() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * We use jwt.sign to generate a token with the payload and a secret
     * */
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(exp.getTime() / 1000),
      },
      process.env.JWT_SECRET
    );
  },
};

UserSchema.methods.generateOTP = function () {
  // use the randomstring npm package to generate a random string
  // and assign it to the user's otp field
  this.otp = randomstring.generate({
    length: 6,
    charset: "numeric",
  });

  // save the user
  return this.save();
};

module.exports = model("User", UserSchema);
