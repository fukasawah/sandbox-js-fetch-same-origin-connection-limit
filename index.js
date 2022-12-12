const express = require("express");
const fs = require("fs");
const https = require("https");

const app = express();

function sleepAsync(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.use(express.static("public"));

app.all("/api/delay", async function (req, res) {
  console.log("start");
  await sleepAsync(1000);
  res.send("Hello World");
  console.log("end");
});

const server = https.createServer(
  {
    key: fs.readFileSync("./tls/key.pem"),
    cert: fs.readFileSync("./tls/server.crt"),
  },
  app
);

server.listen(443);
