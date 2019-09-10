class Alert {
  constructor(_type, _value) {
    this._type = _type;
    this._value = _value;
  }

  getMessage() {
    let message;

    if (this._type == 'HIGH_TEMPERATURE') {
      message = `A temperatura está muito alta!\nValor: ${this._value}`;
    } else if (this._type == 'LOW_TEMPERATURE') {
      message = `A temperatura está muito baixa!\nValor: ${this._type}`;
    } else if (this._type == 'HIGH_AIR_HUMIDITY') {
      message = `A umidade do ar está muito alta!\nValor: ${this._value}`;
    } else if (this._type == 'LOW_AIR_HUMIDITY') {
      message = `A umidade do ar está muito baixa!\nValor: ${this._value}`;
    } else if (this._type == 'HIGH_SOIL_HUMIDITY') {
      message = `A umidade do solo está muito alta!\nValor: ${this._value}`;
    } else if (this._type == 'LOW_SOIL_HUMIDITY') {
      message = `A umidade do solo está muito baixa!\nValor: ${this._value}`;
    }

    return message;
  }

  get type() {
    return this._type;
  }

  get value() {
    return this._value;
  }
}

module.exports = Alert;
