const { isEmail } = require("validator");
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
  },
  displayName: {
    type: String,
    required: [true, "Display name is required"],
    minlength: [3, `Display name must be at least 3 letters`],
    maxlength: [50, "Display name cannot exceed 50 letters"],
  },
  hashedPassword: {
    type: String,
    required: true,
    minLength: 8,
  },
  birthday: {
    type: Date,
    required: [
      true,
      "Birthday is required. User must be at least 18 years old.",
    ],
    validate: {
      validator: function (value) {
        const userBirthYear = Number(
          value.toISOString().split("T")[0].split("-")[0]
        );
        const thisYear = Number(
          new Date().toISOString().split("T")[0].split("-")[0]
        );

        value = thisYear - userBirthYear;

        return value >= 18;
      },
      message: "You must be at least 18 years old.",
    },
  },

  contactNumber: {
    type: String,
    validate: {
      validator: function (value) {
        if (value.length !== 0 && value.length < 8) return false;
      },
      message: "Contact number must be at least 8 numbers",
    },
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

const User = model("User", userSchema);

module.exports = User;
