const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { savePlayerDataEuros24 } = require("./getPlayersEuros24");

const app = express();
app.use(express.json());
app.use(cors());

const euroPlayers = JSON.parse(
  fs.readFileSync(`${__dirname}/data/euroData.json`)
);

app.get("/players/v1/euros/save", (req, res) => {
  console.log("savePlayerDataEuros24 called");
  savePlayerDataEuros24(req, res);
});

app.get("/players/v1/euros/get", (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: euroPlayers.length,
    data: { euroPlayers },
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
