const express = require("express");
const { getPlayersEuros24 } = require("./getPlayersEuros24");

const app = express();
app.use(express.json());

app.get("/players/v1/euros/get", (req, res) => {
  getPlayersEuros24(req, res);
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
