const { model, Schema } = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

  friends: [
    {
      type: String,
    },
  ],
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

module.exports = model("User", UserSchema);
