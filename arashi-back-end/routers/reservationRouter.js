const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const {
  createReservation,
  viewReservations,
  viewOneReservation,
  editReservation,
  deleteReservation,
} = require("../controllers/reservationController copy");

router.post("/:userId/reservations/new", verifyToken, createReservation);
router.put(
  "/:userId/reservations/:reservationId/edit",
  verifyToken,
  editReservation
);
router.get(
  "/:userId/reservations/:reservationId",
  verifyToken,
  viewOneReservation
);

router.get("/:userId/reservations", verifyToken, viewReservations);
router.delete(
  "/:userId/reservations/:reservationId",
  verifyToken,
  deleteReservation
);

module.exports = router;
