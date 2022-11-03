const express = require("express");
const router = express.Router();
const Fitness = require("../models/FitnessRec");
const User = require("../models/User");
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
  const user = await User.find({ userId });
  const getHR = await getHeartRate(user[0].acs_token, userId);
  res.status(200).json(getHR.data);
});

router.get("/activity", async (req, res) => {
  const { userId, date } = req.body;
  const user = await User.find({ userId });
  const getAc = await getActivity(userId, user[0].acs_token, date);
  res.status(200).json(getAc.data);
});

router.get("/breathrate", async (req, res) => {
  const { userId, date } = req.body;
  const user = await User.find({ userId });
  const getHR = await getBreathingRate(user[0].acs_token, userId);
  res.status(200).json(getHR.data);
});

router.get("/heartratevar", async (req, res) => {
  const { userId, date } = req.body;
  const user = await User.find({ userId });
  const getHR = await getHeartRateVar(user[0].acs_token, userId);
  res.status(200).json(getHR.data);
});

router.get("/water", async (req, res) => {
  const { userId, date } = req.body;
  const user = await User.find({ userId });
  const getHR = await getNutrition(user[0].acs_token, userId);
  res.status(200).json(getHR.data);
});

router.get("/sleep", async (req, res) => {
  const { userId, date } = req.body;
  const user = await User.find({ userId });
  const getHR = await getSleep(user[0].acs_token, userId);
  res.status(200).json(getHR.data);
});

router.get("/spo2", async (req, res) => {
  const { userId, date } = req.body;
  const user = await User.find({ userId });
  const getHR = await getSpo2(user[0].acs_token, userId);
  res.status(200).json(getHR.data);
});

router.get("/temp", async (req, res) => {
  const { userId, date } = req.body;
  const user = await User.find({ userId });
  const getHR = await getTemp(user[0].acs_token, userId);
  res.status(200).json(getHR.data);
});

router.get("/vo2", async (req, res) => {
  const { userId, date } = req.body;
  const user = await User.find({ userId });
  const getHR = await getVo2(user[0].acs_token, userId);
  res.status(200).json(getHR.data);
});

module.exports = router;
