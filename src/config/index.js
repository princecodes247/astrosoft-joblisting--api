const dotenv = require("dotenv");
dotenv.config();
const api = {
  prefix: "/api/v1",
};

const config = {
  api,
  databaseURL: process.env.MONGODB_URI,
  role: {
    ADMIN: ["admin"],
    USER: ["admin", "user"],
  },
};

module.exports = config;
