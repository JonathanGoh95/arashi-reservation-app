const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const {
  viewReservations,
  createReservation,
  editReservation,
  deleteReservation,
} = require("../controllers/reservationController.js");

router.post("/:userId/reservations/new", verifyToken, createReservation);
router.get("/:userId/reservations", verifyToken, viewReservations);
router.put(
  "/:userId/reservations/:reservationId/edit",
  verifyToken,
  editReservation
);
router.delete(
  "/:userId/reservations/:reservationId",
  verifyToken,
  deleteReservation
);

module.exports = router;
