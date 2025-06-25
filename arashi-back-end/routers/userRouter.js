const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const { updateUser, deleteUser } = require("../controllers/userController");

// Update User Details
router.put("/:userId/edit", verifyToken, updateUser);
// Delete User Profile
router.delete("/:userId", verifyToken, deleteUser);

module.exports = router;
