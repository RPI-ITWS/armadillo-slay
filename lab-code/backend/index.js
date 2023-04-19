require("dotenv").config();
const express = require("express");
const app = express();

app.listen(3000, async () => {
  console.log("Server running on port 3000");
});

process.on("SIGINT", () => {
  console.log("Closing server");
  process.exit();
});
