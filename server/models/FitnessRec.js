const mongoose = require("mongoose");

const FitnessSchema = new mongoose.Schema({
  activity: [
    {
      type: Object,
    },
  ],
  breathingRate: [
    {
      type: Object,
    },
  ],
  vo2: [
    {
      type: Object,
    },
  ],
  heartRate: [
    {
      type: Object,
    },
  ],
  heartRateVar: [
    {
      type: Object,
    },
  ],
  nutrition: [
    {
      type: Object,
    },
  ],
  sleep: [
    {
      type: Object,
    },
  ],
  spo2: [
    {
      type: Object,
    },
  ],
  temp: [
    {
      type: Object,
    },
  ],
});

module.exports = mongoose.model("FitnessRecord", FitnessSchema);
