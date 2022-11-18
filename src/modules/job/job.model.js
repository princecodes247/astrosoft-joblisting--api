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
  location: {
    type: String,
    default: "Remote",
  },
  salary: {
    max: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  isSalaryNegotiable: {
    type: Array,
    default: true,
  },
  experience: {
    type: Number,
    default: 0,
  },
  jobType: {
    type: String,
    enum: ["internship", "part-time", "full-time", "contract"],
  },
});

JobSchema.index({ title: "text", location: "text" });

module.exports = model("Job", JobSchema);
