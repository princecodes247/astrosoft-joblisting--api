const { model, Schema } = require("mongoose");

// Schema
const ApplicationSchema = new Schema({
  job: {
    // A reference to the job that the application is for
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  user: {
    // A reference to the user that the application is for
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    // The status of the application
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  contact: {
    // The data that the user submitted with the application
    type: Object,
    required: true,
  },

  resume: String,
  date: {
    // The date that the application was created
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Application", ApplicationSchema);
