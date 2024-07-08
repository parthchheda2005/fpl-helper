const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const { refreshEuroData, getEuroData } = require("./getPlayersEuros24");

const app = express();
app.use(express.json());
app.use(cors());

const uri =
  "mongodb://parthhchheda:jgp4m0tm4DUaw2ZM@ac-we4kwe2-shard-00-00.ably4db.mongodb.net:27017,ac-we4kwe2-shard-00-01.ably4db.mongodb.net:27017,ac-we4kwe2-shard-00-02.ably4db.mongodb.net:27017/?replicaSet=atlas-b0n6au-shard-0&ssl=true&authSource=admin";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB Connection successful"));

const euroPlayers = JSON.parse(
  fs.readFileSync(`${__dirname}/data/euroData.json`)
);

app.get("/players/v1/euros/refresh", refreshEuroData);

app.get("/players/v1/euros/get", getEuroData);

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
