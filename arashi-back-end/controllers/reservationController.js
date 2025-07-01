const Reservation = require("../models/reservation.js");
const Branch = require("../models/branch.js");
const { loadUser } = require("../middleware/utils");

const viewPastReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = loadUser(req);
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }

    const today = new Date();
    const reservations = await Reservation.find({
      user: userId,
      reservationDate: { $lt: today },
    })
      .populate({ path: "user", select: "displayName" })
      .populate({ path: "branch", select: "location" })
      .sort({ reservationDate: "desc" });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const viewUpcomingReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = loadUser(req);
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }

    const today = new Date();
    const reservations = await Reservation.find({
      user: userId,
      reservationDate: { $gt: today },
    })
      .populate({ path: "user", select: "displayName" })
      .populate({ path: "branch", select: "location" })
      .sort({ reservationDate: "asc" });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const viewOneReservation = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = loadUser(req);
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }

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

const createReservation = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = loadUser(req);
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }
    const branch = await Branch.findOne({ location: req.body.branch });
    if (!branch) {
      throw new Error("Branch not found!");
    }

    if (branch.totalCapacity < req.body.pax) {
      throw new Error(
        "Not enough capcity at this branch! Please select another branch."
      );
    }

    branch.totalCapacity -= req.body.pax;
    await branch.save();

    req.body.user = req.user;
    req.body.branch = branch;

    const reservation = await Reservation.create(req.body); // Create the new hoot document in the database

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const editReservation = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = loadUser(req);
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }

    const { reservationId } = req.params;

    const reservationItem = await Reservation.findById(reservationId);
    if (!reservationItem) {
      throw new Error("Reservation not found!");
    }

    const branch = await Branch.findOne({ location: req.body.branch });
    if (!branch) {
      throw new Error("Branch not found!");
    }

    if (reservationItem.pax !== req.body.pax) {
      if (reservationItem.pax < req.body.pax) {
        const diff = req.body.pax - reservationItem.pax;
        if (branch.totalCapacity < diff) {
          throw new Error(
            "Not enough capacity at this branch! Please select another branch."
          );
        } else {
          branch.totalCapacity -= diff;
          await branch.save();
        }
      } else {
        const diff = reservationItem.pax - req.body.pax;
        branch.totalCapacity += diff;
        await branch.save();
      }
    }

    req.body.user = req.user;
    req.body.branch = branch;
    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      req.body,
      { new: true, runValidators: true }
    )
      .populate({ path: "user", select: "displayName" })
      .populate({ path: "branch", select: "location" });

    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = loadUser(req);
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }
    const { reservationId } = req.params;

    const reservationItem = await Reservation.findById(reservationId);
    if (!reservationItem) {
      throw new Error("Reservation not found!");
    }

    const branch = await Branch.findById({
      _id: reservationItem.branch,
    });
    if (!branch) {
      throw new Error("Branch not found!");
    }

    branch.totalCapacity += reservationItem.pax;
    await branch.save();

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
