const Reservation = require("../models/reservation.js");
const Branch = require("../models/branch.js");

// Create Reservations
const createReservation = async (req, res) => {
  try {
    const branch = await Branch.findOne({ location: req.body.branch });
    req.body.user = req.user._id;
    req.body.branch = branch._id;

    const reservation = await Reservation.create(req.body); // Create the new hoot document in the database
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Read Past Reservations
const viewPastReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date();
    const reservations = await Reservation.find({
      user: userId,
      reservationDate: { $lt: today },
    })
      .populate({ path: "user", select: "displayName" })
      .populate({ path: "branch", select: "location" })
      .sort({ reservationDate: "desc" });
    console.log(reservations);
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Read Upcoming Reservations
const viewUpcomingReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date();
    const reservations = await Reservation.find({
      user: userId,
      reservationDate: { $gt: today },
    })
      .populate({ path: "user", select: "displayName" })
      .populate({ path: "branch", select: "location" })
      .sort({ reservationDate: "asc" });
    console.log(reservations);
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Read One ReservationAdd commentMore actions
const viewOneReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findOne({
      _id: reservationId,
    })
      .populate({ path: "user", select: "displayName" })
      .populate({ path: "branch", select: "location" });
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Edit Reservation
const editReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const branch = await Branch.findOne({ location: req.body.branch }); //check if can use branch id
    req.body.user = req.user._id;
    req.body.branch = branch._id;
    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      req.body,
      { new: true }
    )
      .populate({ path: "user", select: "displayName" })
      .populate({ path: "branch", select: "location" });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Delete Reservation
const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const deleteReservation =
      await Reservation.findByIdAndDelete(reservationId);
    res.status(200).json(deleteReservation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  createReservation,
  viewPastReservations,
  viewUpcomingReservations,
  viewOneReservation,
  editReservation,
  deleteReservation,
};
