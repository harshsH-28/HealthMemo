const express = require("express");
const router = express.Router();
const Fitness = require("../models/FitnessRec");
const {
  getActivity,
  getBreathingRate,
  getHeartRate,
  getHeartRateVar,
  getNutrition,
  getSleep,
  getSpo2,
  getTemp,
  getVo2,
} = require("../utils/Api");

router.get("/heartrate", async (req, res) => {
  const { userId } = req.body;
  const getHR = await getHeartRate(userId);
});

module.exports = router;
