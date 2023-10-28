const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/authController");

// Creating a new User
router.post("/newuser", signup);

module.exports = router;
