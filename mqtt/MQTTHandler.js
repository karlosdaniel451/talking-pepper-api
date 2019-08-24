const mqtt = require("mqtt");

class MQTTHandler {
  constructor(host, username, password, topic) {
    this.mqttClient = null;
    this.host = host;
    this.username = username; // mqtt credentials if these are needed to connect
    this.password = password;
    this.topic = topic;
  }

  connect() {
    let data;
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    // this.mqttClient = mqtt.connect("tcp://localhost");
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password
    });

    // Mqtt error calback
    this.mqttClient.on("error", err => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => console.log(`mqtt client connected`));

    // mqtt subscriptions
    this.mqttClient.subscribe(this.topic, { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on("message", (topic, message) => {
      data = {
        umidade: message.toJSON("umidade"),
        temperatura: message.toJSON("temperatura"),
        luminosidade: message.toJSON("luminosidade")
      };
    });
    this.mqttClient.end();

    this.mqttClient.on("close", () => console.log(`mqtt client disconnected`));
    return data;
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish(this.topic, message);
  }
}

module.exports = MQTTHandler;
