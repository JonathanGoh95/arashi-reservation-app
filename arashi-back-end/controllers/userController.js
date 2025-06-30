const User = require("../models/user");
const { createPayload } = require("../middleware/utils");
const jwt = require("jsonwebtoken");

const { loadUser } = require("../middleware/utils");

const getUser = async (req, res) => {
  try {
    const currentUser = loadUser(req);
    const { userId } = req.params;
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }

    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const currentUser = loadUser(req);
    const { userId } = req.params;
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    const payload = createPayload(updatedUser);

    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(200).json({ token, payload });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const currentUser = loadUser(req);
    const { userId } = req.params;
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

module.exports = { getUser, updateUser, deleteUser };
