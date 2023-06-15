const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
