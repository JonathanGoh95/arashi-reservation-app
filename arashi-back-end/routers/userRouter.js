const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Get User Details
router.get("/:userId", verifyToken, getUser);
// Update User Details
router.put("/:userId/edit", verifyToken, updateUser);
// Delete User Profile
router.delete("/:userId", verifyToken, deleteUser);

module.exports = router;
