const mqtt = require('mqtt');
const Twitter = require('twitter');

const config = require('../twitter-api/config');
const JSONFileHandler = require('../utils/JSONFileHandler');

let alertsJSONFileHandler = new JSONFileHandler(
  '/home/karlos/Documentos/TalkingPepper/talking-pepper-api/storage/alerts.json'
);

require('../models/Alert');
const AlertBuilder = require('../models/AlertsBuilder');

const Plant = require('../models/Plant');

let twitter = new Twitter(config);

class MqttHandler {
  constructor(host, username, password, topic) {
    this.mqttClient = null;
    this.host = host;
    this.username = username; // mqtt credentials if these are needed to connect
    this.password = password;
    this.topic = topic;
    this.twitterAPI = new Twitter(config);

    if (topic == 'TalkingPepper') {
      this.lastPlantDataJSONFileHandler = new JSONFileHandler(
        '/home/karlos/Documentos/TalkingPepper/talking-pepper-api/storage/last-plant1-data.json'
      );
      this.plant = new Plant(1, 'Pimenteira', 30, 20, 1000, 500, 1010, 600, null, null, null);
    } else if (topic == 'TalkingPepper2') {
      this.lastPlantDataJSONFileHandler = new JSONFileHandler(
        '/home/karlos/Documentos/TalkingPepper/talking-pepper-api/storage/last-plant2-data.json'
      );
      this.plant = new Plant(2, 'Pimenteira 2', 30, 20, 1000, 500, 1010, 600, null, null, null);
    } else {
      throw new Error('Somente os tópicos TalkingPepper1 e TalkingPepper2 são permitidos');
    }

    this.alerts = [];
    this.plant = new Plant();
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password
    });

    // Mqtt error calback
    this.mqttClient.on('error', err => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe(this.topic, { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on('message', (topic, message) => {
      this.lastPlantDataJSONFileHandler.replace(message.toString());

      this.plant.currentTemperature = JSON.parse(message.toString()).temperatura;
      this.plant.currentAirHumidity = JSON.parse(message.toString()).umidade_ar;
      this.plant.currentSoilHumidity = JSON.parse(message.toString()).umidade_solo;

      checkPlantData(this.plant);

      console.log(this.plant.currentTemperature);
      console.log(this.plant.currentAirHumidity);
      console.log(this.plant.currentSoilHumidity);

      console.log(this.plant._maximumTemperature);

      console.log('MQTT message from the topic: ' + topic);
      console.log('Data received: ' + message);

      this.mqttClient.end();
    });

    this.mqttClient.on('close', () => console.log('mqtt cliente disconnected'));
  }

  // Sends a mqtt message to the topic defined on constructor
  sendMessage(message) {
    this.mqttClient.publish(this.topic, message);
  }
}

function checkPlantData(plant) {
  let alert = '';

  if (plant.currentTemperature > 40) {
    alert = `A temperatura está muito alta!\nValor: ${plant.currentTemperature} `;
    postTweet(alert);
  }

  if (plant.currentSoilHumidity > 360) {
    alert = `A umidade está muito baixa!\nValor: ${plant.currentSoilHumidity} `;
    postTweet(alert);
  } else if (plant.currentSoilHumidity < 200) {
    alert = `A umidade está muito baixa!\nValor: ${plant.currentSoilHumidity} `;
    postTweet(alert);
  }
}

//this.alerts.push(AlertBuilder.buildAlerts(plant));

//console.log('Quantidade de alertas: ' + alerts.length);

/*
  if (this.alerts.length > 0) {
    postTweet(alerts);
    return alerts;
  }
  */

function postTweet(alert) {
  /*
  let message = '';
  for (let i = 0; i < alerts.length; i++) {
    alertsJSONFileHandler.replace();
    message += alerts[i].getMessage() + '\n\n';
  }
  */

  twitter.post(
    'statuses/update',
    { status: `${alert}\nTempo: ${new Date()}` },
    (error, tweet, response) => {
      if (error) {
        console.log('Error: ' + error);
      } else {
        console.log(tweet);
      }
      console.log(response);
    }
  );
}

module.exports = MqttHandler;
