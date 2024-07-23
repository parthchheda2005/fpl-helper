const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");

const {
  refreshEuroData,
  getEuroData,
} = require("./controllers/euroController");
const { refreshPLData, getPLData } = require("./controllers/plController");
const { getFPLSquad } = require("./getDataFromInternet/getFPLSquad");

dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.DATABASE_CONN;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB Connection successful"));

app.get("/players/v1/euros/refresh", refreshEuroData);

app.get("/players/v1/euros/get", getEuroData);

app.get("/players/v1/pl/refresh", refreshPLData);

app.get("/players/v1/pl/get", getPLData);

app.get("/squad/v1/get/:id/:gw", getFPLSquad);

// refreshPLData();

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log(process.env.NODE_ENV);
});
