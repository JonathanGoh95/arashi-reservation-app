const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Create User Details

// Get User Details
router.get("/:userId/edit", verifyToken, getUser);
// Update User Details
router.put("/:userId/edit", verifyToken, updateUser);
// Delete User Profile
router.delete("/:userId", verifyToken, deleteUser);

module.exports = router;
