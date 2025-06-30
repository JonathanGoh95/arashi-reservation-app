const User = require("../models/user");

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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { runValidators: true },
      { new: true }
    );
    res.status(200).json(updatedUser);
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
