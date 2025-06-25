const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const reservationSchema = new Schema(
  {
    reservationName: {
      type: String,
      required: true,
      trim: true,
    },
    reservationDate: {
      type: Date,
      required: true,
    },
    reservationTime: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    pax: {
      type: Number,
      required: true,
      maxValue: 8,
    },
    remarks: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
