const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const branchSchema = new Schema({
  location: {
    type: String,
    required: [true, "Branch location is required."],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Branch address is required."],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
    trim: true,
    minlength: [8, `Contact number must be at least 8 numbers`],
  },
  businessHours: {
    type: String,
    trim: true,
    required: [true, "Business hours are required"],
  },
  totalCapacity: {
    type: Number,
    required: [true, "Total capacity is required"],
    max: 8,
  },
});

const Branch = model("Branch", branchSchema);

module.exports = Branch;
