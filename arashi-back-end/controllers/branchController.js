const Branch = require("../models/branch");

const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find({});
    res.json(branches);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { getBranches };
