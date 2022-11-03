const express = require("express");
const router = express.Router();

router.post("/newuser", (req, res) => {
  const { authCode, userEmail, docEmail, mobileNo } = req.body;
  
});

module.exports = router;
