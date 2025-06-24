const User = require("../models/user");

const { loadUser } = require("../middleware/utils");

const updateUser = async (req, res) => {
  try {
    const currentUser = loadUser(req);
    const { userId } = req.params;
    if (currentUser._id !== userId) {
      res.status(403).send("Unauthorized User");
    }

    const updateUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json({ updateUser });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

module.exports = { updateUser };
