let Alert = require('./Alert');

class AlertsBuilder {
  static buildAlerts(plant) {
    let alerts = [];

    if (plant.currentTemperature > 40) {
      alerts.push(new Alert('HIGH_TEMPERATURE', plant.currentTemperature));
    } else {
      if (plant.currentTemperature < plant.minimumTemperature) {
        alerts.push(new Alert('LOW_TEMPERATURE', 12));
      }
    }

    if (plant.currentAirHumidity > plant.maximumAirHumidity) {
      alerts.push(new Alert('LOW_AIR_HUMIDITY', plant.currentAirHumidity));
    } else {
      if (plant.currentAirHumidity < plant.minimumAirHumidity) {
        alerts.push(new Alert('HIGH_AIR_HUMIDITY', plant.currentAirHumidity));
      }
    }

    if (plant.currentSoilHumidity > 1024) {
      alerts.push(new Alert('LOW_SOIL_HUMIDITY', plant.currentSoilHumidity));
    } else {
      if (plant.currentSoilHumidity < 300) {
        alerts.push(new Alert('HIGH_SOIL_HUMIDITY', plant.currentSoilHumidity));
      }
    }

    return alerts;
  }
}

module.exports = AlertsBuilder;
