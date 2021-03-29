const mongoose = require("mongoose");
const { Schema } = mongoose;

const biodataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Biodata", biodataSchema);
