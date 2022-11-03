const axios = require("axios");
require("dotenv");

// Extra api's for getting the Data

const getAccessToken = async (authCode) => {
  try {
    const clientCode = process.env.BASE64AUTH;
    const data = {};
    const params = new URLSearchParams({
      client_id: process.env.ClientId,
      code: `${authCode}`,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000",
    }).toString();
    const baseUrl = `https://api.fitbit.com/oauth2/token?${params}`;
    const jsonData = await axios.post(baseUrl, data, {
      headers: {
        Authorization: `Basic ${clientCode}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return jsonData.data;
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const userData = async (accessToken, userId) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/profile.json`;
    const userJsonData = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return userJsonData.data;
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const getActivity = async (accessToken, userId, date) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/activities/date/${date}.json`;
    const userAcData = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const getBreathingRate = async (accessToken, userId, date) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/br/date/${date}.json`;
    const userBrData = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const getVo2 = async (accessToken, userId, date) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/cardioscore/date/${date}.json`;
    const userVo2Data = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const getHeartRate = async (accessToken, userId) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/activities/heart/date/today/1d.json`;
    const userHrData = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const getHeartRateVar = async (accessToken, userId, date) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/hrv/date/${date}.json`;
    const userHrvData = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const getNutrition = async (accessToken, userId) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/foods/log/water/date/today/1d.json`;
    const userWaterData = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const getSleep = async (accessToken, userId, date) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/sleep/date/${date}.json`;
    const userSleepData = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const getSpo2 = async (accessToken, userId, date) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/spo2/date/${date}.json`;
    const userSpo2Data = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

const getTemp = async (accessToken, userId, date) => {
  try {
    const baseUrl = `https://api.fitbit.com/1/user/${userId}/temp/core/date/${date}.json`;
    const userTempData = await axios.get(baseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log("Something is wrong with the fitbit request");
    console.log(error);
  }
};

module.exports = {
  getAccessToken,
  userData,
  getActivity,
  getBreathingRate,
  getHeartRate,
  getHeartRateVar,
  getNutrition,
  getSleep,
  getSpo2,
  getTemp,
  getVo2,
};
