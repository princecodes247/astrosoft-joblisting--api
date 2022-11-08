const { model, Schema } = require("mongoose");

// Schema
const ApplicationSchema = new Schema({
  job: {},
  user: {},
  details: {},
});

module.exports = model("Application", ApplicationSchema);
