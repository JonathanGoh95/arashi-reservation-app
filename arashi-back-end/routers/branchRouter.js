const express = require("express");
const router = express.Router();
const { getBranches } = require("../controllers/branchController");

// dont need to verify token for find-us page
router.get("/", getBranches);

module.exports = router;
