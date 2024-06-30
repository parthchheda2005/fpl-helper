const express = require("express");

const app = express();
app.use(express.json());

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
