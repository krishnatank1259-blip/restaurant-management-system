const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  date: String,
  time: String,
  tableNo: String,
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);