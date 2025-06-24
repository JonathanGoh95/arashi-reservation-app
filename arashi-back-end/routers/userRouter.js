const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const { updateUser } = require("../controllers/userController");

router.post("/", verifyToken);
router.put("/:userId/profile", verifyToken, updateUser);
router.get("/", verifyToken);
router.delete("/", verifyToken);

module.exports = router;
