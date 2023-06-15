const express = require('express');
const booking = require("../model/booking.model");
const router = express.Router();

router.get('/booking', function(req, res) {
    booking.find()
      .then(bookings => {
        res.status(200).json(bookings);
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to retrieve booking data",
          error: err
        });
      });
  });
  

router.post('/booking', (req, res) => {
  const BookingData = req.body;
  const Booking = new booking({
    origin: BookingData.origin,
    destination: BookingData.destination,
    startDate: BookingData.startDate,
    endDate: BookingData.endDate
  });

  Booking.save()
    .then(newBooking => {
      res.status(201).json({
        message: "Car details saved successfully",
        data: newBooking
      });
    })
    .catch(err => {
      res.json({
        message: "Failed to save Car details",
        error: err
      });
    });
});

module.exports = router;
