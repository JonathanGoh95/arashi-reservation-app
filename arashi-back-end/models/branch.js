const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const branchSchema = new Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  businessHours: {
    type: String,
    required: true,
  },
  totalTables: {
    type: Number,
    required: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
  },
});

const Branch = model("Branch", branchSchema);

module.exports = Branch;
