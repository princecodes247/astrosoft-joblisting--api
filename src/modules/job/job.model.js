const { model, Schema } = require("mongoose");

// Schema
const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  email: {
    type: String,
    unique: true,
    required: true,
  },
  company: String,
  employer: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Job", JobSchema);
