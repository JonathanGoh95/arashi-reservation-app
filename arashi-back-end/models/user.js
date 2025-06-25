const { isEmail, isLength } = require("validator");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: "Please enter a valid email address",
    },
    //Reference: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
  },
  displayName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  hashedPassword: {
    type: String,
    required: true,
    minLength: 8,
  },
  birthday: {
    type: Date,
    validate: {
      validator: function (value) {
        return value < new Date();
        //Reference same as above
      },
      message: "Your birthday must be in the past.",
    },
  },
  contactNumber: {
    type: String,
    //Includes the case for international numbers
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

const User = model("User", userSchema);

module.exports = User;
