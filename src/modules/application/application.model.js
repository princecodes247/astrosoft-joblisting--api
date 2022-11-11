const { model, Schema } = require("mongoose");

// Schema
const ApplicationSchema = new Schema({
  job: {
    // A reference to the job that the application is for
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
  user: {
    // A reference to the user that the application is for
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    // The status of the application
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  data: {
    // The data that the user submitted with the application
    type: Object,
  },
  date: {
    // The date that the application was created
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Application", ApplicationSchema);
