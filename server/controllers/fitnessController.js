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
  getNewAccess,
} = require("../utils/Api");

const heartRate = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ userId });
    var getHR = await getHeartRate(user.acs_token, userId);
    if (getHR === "expired_token") {
      await getNewAccess(user.rfh_token);
      getHR = await getHeartRate(user.acs_token, userId);
    }
    const resultJson = getHR["activities-heart"][0].value.heartRateZones;
    const resultData = {};
    for (let i = 0; i < 4; i++) {
      const data = resultJson[i].name;
      resultData[data] = resultJson[i];
    }
    await User.updateOne({ userId }, { $push: { heartRate: resultData } });
    res.status(200).json(resultData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

const activity = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.date;
    const user = await User.findOne({ userId });
    var getAc = await getActivity(userId, user.acs_token, date);
    if (getAc === "expired_token") {
      await getNewAccess(user.rfh_token);
      getAc = await getActivity(userId, user[0].acs_token, date);
    }
    const myActivity = {
      activityCalories: getAc.summary.activityCalories,
      caloriesBMR: getAc.summary.caloriesBMR,
      caloriesOut: getAc.summary.caloriesOut,
    };
    await User.updateOne({ userId }, { $push: { activity: myActivity } });
    res.status(200).json(myActivity);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.response.data });
  }
};

const breathingRate = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.date;
    const user = await User.findOne({ userId });
    var getBR = await getBreathingRate(user.acs_token, userId, date);
    if (getBR === "expired_token") {
      await getNewAccess(user.rfh_token);
      getBR = await getBreathingRate(user.acs_token, userId, date);
    }
    if (getBR.br.length !== 0) {
      const resultJson = {
        breathingRate: getBR.br[0].value.breathingRate,
        date: getBR.br[0].dateTime,
      };
      await User.updateOne(
        { userId },
        { $push: { breathingRate: resultJson } }
      );
      res.status(200).json(resultJson);
    }
    res
      .status(200)
      .json({ status: "failure", message: "No Breathing Data Found" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

const heartRateVar = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.date;
    const user = await User.findOne({ userId });
    var getHRV = await getHeartRateVar(user.acs_token, userId, date);
    if (getHRV === "expired_token") {
      await getNewAccess(user.rfh_token);
      getHRV = await getHeartRateVar(user.acs_token, userId, date);
    }
    if (getHRV.hrv.length !== 0) {
      const resultJson = {
        dailyRmssd: getHRV.hrv[0].value.dailyRmssd,
        deepRmssd: getHRV.hrv[0].value.deepRmssd,
        date: getHRV.hrv[0].dateTime,
      };
      await User.updateOne({ userId }, { $push: { heartRateVar: resultJson } });
      res.status(200).json(resultJson);
    }
    res.status(200).json({
      status: "failure",
      message: "No Heart Rate Variability Data Found",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

const waterlevel = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.date;
    const user = await User.findOne({ userId });
    var getWater = await getNutrition(user.acs_token, userId, date);
    if (getWater === "expired_token") {
      await getNewAccess(user.rfh_token);
      getWater = await getNutrition(user.acs_token, userId, date);
    }
    const resultData = {
      waterLog: getWater.summary.water,
    };
    await User.updateOne({ userId }, { $push: { nutrition: resultData } });
    res.status(200).json(resultData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

const sleep = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.date;
    const user = await User.findOne({ userId });
    var getsleep = await getSleep(user.acs_token, userId, date);
    if (getsleep === "expired_token") {
      await getNewAccess(user.rfh_token);
      getsleep = await getSleep(user.acs_token, userId, date);
    }
    if (getsleep.sleep.length !== 0) {
      const resultData = {
        date,
        awakeCount: getsleep.sleep[0].awakeCount,
        awakeDuration: getsleep.sleep[0].awakeDuration,
        awakeningsCount: getsleep.sleep[0].awakeningsCount,
        duration: getsleep.sleep[0].duration,
        efficiency: getsleep.sleep[0].efficiency,
        minutesAsleep: getsleep.sleep[0].minutesAsleep,
        minutesAwake: getsleep.sleep[0].minutesAwake,
        restlessCount: getsleep.sleep[0].restlessCount,
        restlessDuration: getsleep.sleep[0].restlessDuration,
        totalMinutesAsleep: getsleep.summary.totalMinutesAsleep,
        totalSleepRecords: getsleep.summary.totalSleepRecords,
        totalTimeInBed: getsleep.summary.totalTimeInBed,
      };
      await User.updateOne({ userId }, { $push: { sleep: resultData } });
      res.status(200).json(resultData);
    }
    res.status(200).json({ status: "failure", message: "No sleep Data Found" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

const spo2 = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.date;
    const user = await User.findOne({ userId });
    var getspo2 = await getSpo2(user.acs_token, userId, date);
    if (getspo2 === "expired_token") {
      await getNewAccess(user.rfh_token);
      getspo2 = await getSpo2(user.acs_token, userId, date);
    }
    if (Object.keys(getspo2).length !== 0) {
      const resultData = {
        date: getspo2.dateTime,
        min: getspo2.value.min,
        avg: getspo2.value.avg,
        max: getspo2.value.max,
      };
      await User.updateOne({ userId }, { $push: { spo2: resultData } });
      res.status(200).json(resultData);
    }
    res.status(200).json({ status: "failure", message: "No Spo2 Data Found" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

const temp = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.date;
    const user = await User.findOne({ userId });
    var gettemp = await getTemp(user.acs_token, userId, date);
    if (gettemp === "expired_token") {
      await getNewAccess(user.rfh_token);
      gettemp = await getTemp(user.acs_token, userId, date);
    }
    if (gettemp.tempCore.length !== 0) {
      const resultData = {
        from: {
          dateTime: gettemp.tempCore[0].dateTime,
          temp: gettemp.tempCore[0].value,
        },
        to: {
          dateTime: gettemp.tempCore[1].dateTime,
          temp: gettemp.tempCore[1].value,
        },
      };
      await User.updateOne({ userId }, { $push: { temp: resultData } });
      res.status(200).json(resultData);
    }
    res
      .status(200)
      .json({ status: "failure", message: "No Temp Core Data Found" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

const vo2 = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.date;
    const user = await User.findOne({ userId });
    var getvo2 = await getVo2(user.acs_token, userId, date);
    if (getvo2 === "expired_token") {
      await getNewAccess(user.rfh_token);
      getvo2 = await getVo2(user.acs_token, userId, date);
    }
    if (getvo2 !== "no_data") {
      const resultData = {
        date: cardioScore[0].dateTime,
        vo2Max: cardioScore[0].value.vo2Max,
      };
      await User.updateOne({ userId }, { $push: { vo2: resultData } });
      res.status(200).json(resultData);
    }
    res.status(200).json({
      status: "failure",
      message: "You Don't have Access to Vo2 or No Data Found",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

const yellowBar = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = req.params.date;
    const user = await User.findOne({ userId });
    var getYellowCardData = await getActivity(userId, user.acs_token, date);
    if (getYellowCardData === "expired_token") {
      await getNewAccess(user.rfh_token);
      getYellowCardData = await getActivity(userId, user.acs_token, date);
    }
    res.status(200).json({
      status: "success",
      stepGoal: getYellowCardData.goals.steps,
      step: getYellowCardData.summary.steps,
      distance: getYellowCardData.summary.distances[0].distance,
      calories: getYellowCardData.summary.caloriesOut,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = {
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
};
