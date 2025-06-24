const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const { getBranches } = require("../controllers/branchController");

router.get("/", verifyToken, getBranches);

module.exports = router;
