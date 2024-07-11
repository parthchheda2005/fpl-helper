const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  refreshEuroData,
  getEuroData,
} = require("./controllers/euroController");
const { refreshPLData, getPLData } = require("./controllers/plController");

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

app.get("/players/v1/euros/refresh", refreshEuroData);

app.get("/players/v1/euros/get", getEuroData);

app.get("/players/v1/pl/refresh", refreshPLData);

app.get("/players/v1/pl/get", getPLData);

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
