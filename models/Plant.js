class Plant {
  constructor(
    _id,
    _name,
    _maximumTemperature,
    _minimumTemperature,
    _maximumAirHumidity,
    _minimumAirHumidity,
    _maximumSoilHumidity,
    _minimumSoilHumidity,
    _currentTemperature,
    _currentAirHumidity,
    _currentSoilHumidity
  ) {
    this._id = _id;
    this._name = _name;
    this._maximumTemperature = _maximumTemperature;
    this._minimumTemperature = _minimumTemperature;
    this._maximumAirHumidity = _maximumTemperature;
    this._minimumAirHumidity = _minimumAirHumidity;
    this._maximumSoilHumidity = _maximumSoilHumidity;
    this._minimumSoilHumidity = _minimumSoilHumidity;
    this._currentTemperature = _currentTemperature;
    this._currentAirHumidity = _currentAirHumidity;
    this._currentSoilHumidity = _currentSoilHumidity;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get maximumTemperature() {
    return this._maximumTemperature;
  }

  set maximumTemperature(maximumTemperature) {
    this._maximumTemperature = maximumTemperature;
  }

  get maximumAirHumidity() {
    return this._maximumAirHumidity;
  }

  set maximumAirHumidity(maximumAirHumidity) {
    this._maximumAirHumidity = maximumAirHumidity;
  }

  get minimumAirHumidity() {
    return this._minimumAirHumidity;
  }

  set minimumAirHumidity(minimumAirHumidity) {
    this._minimumAirHumidity = minimumAirHumidity;
  }

  get maximumSoilHumidity() {
    return this._maximumSoilHumidity;
  }

  set maximumSoilHumidity(maximumSoilHumidity) {
    this._maximumSoilHumidity = maximumSoilHumidity;
  }

  get minimumSoilHumidity() {
    return this._minimumSoilHumidity;
  }

  set minimumSoilHumidity(minimumSoilHumidity) {
    this._minimumSoilHumidity = minimumSoilHumidity;
  }

  get currentTemperature() {
    return this._currentTemperature;
  }

  set currentTemperature(currentTemperature) {
    this._currentTemperature = currentTemperature;
  }

  get currentAirHumidity() {
    return this._currentAirHumidity;
  }

  set currentAirHumidity(currentAirHumidity) {
    this._currentAirHumidity = currentAirHumidity;
  }

  get currentSoilHumidity() {
    return this._currentSoilHumidity;
  }

  set currentSoilHumidity(currentSoilHumidity) {
    this._currentSoilHumidity = currentSoilHumidity;
  }
}

module.exports = Plant;
