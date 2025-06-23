const express = require("express");
const router = express.Router();

const Branch = require("../models/branch");

const verifyToken = require("../middleware/verify-token");
// const { loadUser } = require("../middleware/utils");

router.get("/", verifyToken, async (req, res) => {
  try {
    const branches = await Branch.find({});
    res.json(branches);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
