require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
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

// Checking Api EndPoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is Working" });
});

app.use("/api", require("./routes/User"));
app.use("/api/fitness", require("./routes/Fitness"));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});