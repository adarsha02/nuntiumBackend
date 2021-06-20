const mongoose = require("mongoose");

const liveUpdateSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      max: 200,
    },
    headline: {
      type: String,
      required: true,
      max: 500,
      min: 6,
    },
    subheadline: {
      type: String,
      required: true,
      max: 2000,
      min: 6,
    },
    date: {
      type: Date,
      required: true,
    },
    keyword: {
      type: String,
      required: false,
    },
    writer: {
      type: String,
      required: true,
    },
  },
  { collection: "liveupdate" }
);

module.exports = mongoose.model("liveupdate", liveUpdateSchema);
