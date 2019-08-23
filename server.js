const express = require("express");
const app = express();

const MQTTHandler = require("./mqtt/MQTTHandler");

const port = 3000;

app.get("/", (req, res) => {
  console.log("Request from " + req.ip);
  res.json({
    mesasge: "ok"
  });
});

app.get("/plants/", (req, res) => {});

app.get("/plants/data/", (req, res) => {
  const mqttHandler = new MQTTHandler("localhost", "", "", "TalkingPepper");
  res.json(mqttHandler.connect());
});

app.listen(port, () => console.log("Server is runing at " + port));
