// models/Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  images: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Image", imageSchema);
