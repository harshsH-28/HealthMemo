const { getAccessToken, userData } = require("../utils/Api.js");
const User = require("../models/User");

const signup = async (req, res) => {
  try {
    const { authCode, email, docEmail, mobileNo } = req.body;
    const tokenData = await getAccessToken(authCode);
    const UserData = await userData(tokenData.access_token, tokenData.user_id);
    const { age, dateOfBirth, fullName, gender, weight } = UserData.user;
    const newUser = await new User({
      userId: tokenData.user_id,
      name: fullName,
      email,
      docEmail,
      gender,
      p_no: mobileNo,
      acs_token: tokenData.access_token,
      rfh_token: tokenData.refresh_token,
      age,
      weight,
    });
    await newUser.save();
    res.status(200).send({
      status: "success",
      message: "FuckOff",
      token: tokenData.access_token,
      user_id: tokenData.user_id,
    });
  } catch (err) {
    console.log("Something went wrong during creating a new user");
    console.log(err);
    res.status(200).send({ status: "failure", message: "FuckOff" });
  }
};

module.exports = { signup };
