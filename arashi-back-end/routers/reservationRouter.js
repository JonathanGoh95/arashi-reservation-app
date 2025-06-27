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

router.post("/new", verifyToken, createReservation);
router.get("/:userId/past", verifyToken, viewPastReservations);
router.get("/:reservationId/edit", verifyToken, viewOneReservation);
router.get("/:userId/upcoming", verifyToken, viewUpcomingReservations);
router.put("/:reservationId/edit", verifyToken, editReservation);
router.delete("/:reservationId", verifyToken, deleteReservation);

module.exports = router;
