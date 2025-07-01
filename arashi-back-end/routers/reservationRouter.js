const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const {
  viewPastReservations,
  viewUpcomingReservations,
  viewOneReservation,
  createReservation,
  editReservation,
  deleteReservation,
} = require("../controllers/reservationController.js");

router.post("/:userId/new", verifyToken, createReservation);
router.get("/:userId/past", verifyToken, viewPastReservations);
router.get("/:userId/:reservationId/edit", verifyToken, viewOneReservation);
router.get("/:userId/upcoming", verifyToken, viewUpcomingReservations);
router.put("/:userId/:reservationId/edit", verifyToken, editReservation);
router.delete("/:userId/:reservationId", verifyToken, deleteReservation);

module.exports = router;
