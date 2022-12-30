const { model, Schema } = require("mongoose");

// Transaction History Schema
const HistorySchema = new Schema({
  user: {
    // A reference to the user that the application is for
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    // The status of the application
    type: String,
    enum: ["pending", "completed", "declined"],
    default: "pending",
  },

  type: {
    type: String,
    enum: ["deposit", "withdraw", "buy", "sell"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

  details: {
    type: Object,
    required: true,
  },

  date: {
    // The date that the application was created
    type: Date,
    default: Date.now,
  },
});

module.exports = model("History", HistorySchema);
