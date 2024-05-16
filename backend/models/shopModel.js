const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Badminton Shop",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email!"],
  },
});

module.exports = mongoose.model("Shop", shopSchema);
