const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const saltRounds = 12;

const createPayload = (user) => {
  return {
    email: user.email,
    _id: user._id,
    displayName: user.displayName,
    birthday: user.birthday,
    contactNumber: user.contactNumber,
  };
};

const signUp = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ email: req.body.email });
    if (userInDatabase) {
      return res
        .status(409)
        .json({ err: "This Email has already been taken." });
    }

    const user = await User.create({
      email: req.body.email,
      displayName: req.body.displayName,
      hashedPassword: bcrypt.hashSync(req.body.password, saltRounds),
      birthday: req.body.birthday,
      contactNumber: req.body.contactNumber,
    });

    const payload = createPayload(user);

    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ err: "Email address not found." });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.hashedPassword,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: "Invalid credentials." });
    }

    const payload = createPayload(user);

    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { signIn, signUp };
