const { model, Schema } = require("mongoose");

// Schema
const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  poster: String,
  employer: String,
});

module.exports = model("Job", JobSchema);
