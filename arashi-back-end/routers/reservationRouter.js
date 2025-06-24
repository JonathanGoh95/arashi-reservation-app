const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");

router.post("/", verifyToken);
router.put("/", verifyToken);
router.get("/", verifyToken);
router.delete("/", verifyToken);

module.exports = router;
