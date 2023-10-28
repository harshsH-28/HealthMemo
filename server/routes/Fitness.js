const express = require("express");
const router = express.Router();
const {
  heartRate,
  activity,
  breathingRate,
  heartRateVar,
  waterlevel,
  sleep,
  spo2,
  temp,
  vo2,
  yellowBar,
} = require("../controllers/fitnessController");

router.get("/heartrate/:id", heartRate);
router.get("/activity/:id/:date", activity);
router.get("/breathrate/:id/:date", breathingRate);
router.get("/heartratevar/:id/:date", heartRateVar);
router.get("/water/:id/:date", waterlevel);
router.get("/sleep/:id/:date", sleep);
router.get("/spo2/:id/:date", spo2);
router.get("/temp/:id/:date", temp);
router.get("/vo2/:id/:date", vo2);
router.get("/yellowbar/:id/:date", yellowBar);

module.exports = router;
