const express = require("express");
const router = express.Router();
const { signIn, signUp } = require("../controllers/authController");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
