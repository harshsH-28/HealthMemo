const axios = require("axios");

// Extra api's for getting the Data

const UserData = (authCode) => {
  axios.get("https://api.fitbit.com/oauth2/token", {
    headers: {
      Authorization:
        "Basic MjM4VExQOjk0ZDZlNWMyM2VmMGE5ZDYwYzg0Y2I4NDM5NGFkYjhk",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

module.exports = UserData;
