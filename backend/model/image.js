const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  // Add other fields as necessary
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
