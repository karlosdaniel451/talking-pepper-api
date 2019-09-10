const express = require('express');
const bodyParser = require('body-parser');

const MQTTHandler = require('./mqtt/MQTTHandler');
const config = require('./twitter-api/config');
const JSONFileHandler = require('./utils/JSONFileHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let lastPlant1DataJSONFileHandler = new JSONFileHandler('./storage/last-plant1-data.json');
let lastPlant2DataJSONFileHandler = new JSONFileHandler('./storage/last-plant2-data.json');

const port = process.argv[2];

let mqttHandlerPlant1 = new MQTTHandler('tcp://localhost', null, null, 'TalkingPepper');
let mqttHandlerPlant2 = new MQTTHandler('tcp://localhost', null, null, 'TalkingPepper2');

setInterval(() => {
  mqttHandlerPlant1.connect();
}, process.argv[3]);

/*
setInterval(() => {
  mqttHandlerPlant2.connect();
}, process.argv[3]);
*/
app.get('/', (req, res) => {
  res.json({
    message: 'OK'
  });
});

app.get('/alerts/:id', (req, res) => {
  if (req.params.id == 1) {
    res.json(mqttHandlerPlant1.alerts);
  } else if (req.params.id == 2) {
    res.json(mqttHandlerPlant1.alerts);
  }
});

app.get('/plants/', (req, res) => {});

app.get('/plants/data/:id', (req, res) => {
  if (req.params.id == 1) {
    res.json(lastPlant1DataJSONFileHandler.getData());
    console.log('Request from ' + req.ip);
  } else if (req.params.id == 2) {
    res.json(lastPlant2DataJSONFileHandler.getData());
  } else {
    res
      .json({
        error: 'Plant not found'
      })
      .status(404);
  }
});

app.get('/plants/data/:id/', (req, res) => {
  if (req.params.id == 1) {
    res.json(lastPlant1DataJSONFileHandler.getData());
  } else if (req.params.id == 2) {
    res.json(lastPlant2DataJSONFileHandler.getData());
  } else {
    res
      .json({
        error: 'Plant not found'
      })
      .status(404);
  }

  // console.log('Request from ' + req.ip);
});

app.post('/plants/send/', (req, res) => {
  res.json({
    message: 'OK'
  });

  console.log('Request from ' + req.ip);
});

app.listen(port, () => console.log('Server is runing at ' + port));
