const mqtt = require('mqtt');

let JSONFileHandler = require('../utils/json-file-handler');

JSONFileHandler = new JSONFileHandler(
  '/home/karlos/Documentos/TalkingPepper/talking-pepper-api/storage/last-plants-data.json'
);

class MqttHandler {
  constructor(host, username, password, topic) {
    this.mqttClient = null;
    this.host = host;
    this.username = username; // mqtt credentials if these are needed to connect
    this.password = password;
    this.topic = topic;
  }

  connect() {
    // let data;
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
      JSONFileHandler.replace(message.toString());

      console.log('MQTT message from the topic: ' + topic);
      console.log('Data received: ' + message);

      this.mqttClient.end();
    });

    this.mqttClient.on('close', () => console.log('mqtt cliente disconnected'));

    // return data;
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish(this.topic, message);
  }
}

module.exports = MqttHandler;
