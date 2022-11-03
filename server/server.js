require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

mongoose
  .connect("mongodb://localhost:27017/healthMemo")
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Error");
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/User"));

app.get("/", (req, res) => {
  res.status(200).json({ Harsh: "hemlo" });
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
