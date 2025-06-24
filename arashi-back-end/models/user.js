const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  contactNumber: {
    type: Number,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = model("User", userSchema);
