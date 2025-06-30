const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const reservationSchema = new Schema(
  {
    reservationName: {
      type: String,
      required: [true, "Please fill in the reservation name"],
      trim: true,
      minlength: [3, "Reservation name must be at least 3 letters"],
      maxlength: [50, "Your name cannot exceed 50 letters"],
    },
    reservationDate: {
      type: Date,
      required: [true, "Please fill in the reservation date"],
      validate: {
        validator: function (value) {
          const today = new Date();
          let tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          let minDate = new Date(tomorrow).toISOString().split("T")[0];

          let reservationDate = new Date(value).toISOString().split("T")[0];

          return reservationDate >= minDate;
        },
        message: "Reservation can only be made one day berfore.",
      },
    },
    reservationTime: {
      type: String,
      required: [true, "Please fill in the reservation time"],
      enum: ["11.00am", "1.00pm", "5.00pm", "7.00pm"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      minlength: [8, `Contact number must be at least 8 numbers`],
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Please select a branch"],
    },
    pax: {
      type: Number,
      required: [true, "Reservation must have at least 1 pax"],
      minValue: [1, "Reservation must have at least 1 pax"],
      maxValue: [8, "You can reserve up to 8 pax"],
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
  { timestamps: true }
);

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
