const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  displayName: {
    type: String,
    required: true,
    minlength: 2,
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
      },
    },
  },
  contactNumber: {
    type: String,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

const User = model("User", userSchema);

module.exports = User;
