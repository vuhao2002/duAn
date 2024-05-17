const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter your title news!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your news description!"],
  },
  images: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("News", newsSchema);
