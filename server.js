const express = require("express");
const bodyParser = require("body-parser");

const MQTTHandler = require("./mqtt/MQTTHandler");
let JSONFileHandler = require("./utils/json-file-handler");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.argv[2];

JSONFileHandler = new JSONFileHandler("./storage/last-plants-data.json");

let mqttHandlerPlant1 = new MQTTHandler(
  process.argv[3],
  process.argv[4],
  process.argv[5],
  process.argv[6]
);

let lastPlantsData = "teset";

setInterval(() => {
  mqttHandlerPlant1.connect();
  lastPlantsData = JSONFileHandler.getData();
}, process.argv[7]);

app.get("/", (req, res) => {
  res.json({
    message: "OK"
  });
});

app.get("/plants/", (req, res) => {});

app.get("/plants/data/", (req, res) => {
  res.json(lastPlantsData);

  console.log("Request from " + req.ip);
});

app.post("/plants/send/", (req, res) => {
  res.json({
    message: "OK"
  });

  console.log("Request from " + req.ip);
});

app.listen(port, () => console.log("Server is runing at " + port));
