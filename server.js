const express = require("express");
const bodyParser = require("body-parser");

const MQTTHandler = require("./mqtt/MQTTHandler");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

let mqttHandler;

app.get("/", (req, res) => {
  res.json({
    message: "OK"
  });
});

app.get("/plants/", (req, res) => {});

app.get("/plants/data/", (req, res) => {
  res.json(mqttHandler.connect());
});

app.post("/plants/send/", (req, res) => {
  console.log("Request from " + req.ip);

  mqttHandler = new MQTTHandler(
    req.params.host,
    req.params.username,
    req.params.password,
    req.params.topic
  );
  mqttHandler.connect();

  mqttHandler.sendMessage(req.params.message);

  res.json({
    message: "OK"
  });
});

app.listen(port, () => console.log("Server is runing at " + port));
