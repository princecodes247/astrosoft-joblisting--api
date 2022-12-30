const { model, Schema } = require("mongoose");

// Schema
const CollectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CollectionSchema.index({ title: "text", description: "text" });

module.exports = model("Collection", CollectionSchema);
