class IsDev {
  constructor() {
    this._default = null;
    this._env = null;
    this._values = ['prod', 'production'];
    return this.default;
  }

  get default() {
    const envValue = process.env.NODE_ENV;
    if (!envValue) {
      this._default = true;
      this._env = undefined;
      return this._default;
    }

    const normalized = envValue.toLowerCase();
    const isProd = this._values.some(value => normalized === value);
    this._default = !isProd;
    this._env = { key: 'NODE_ENV', value: envValue };

    return this._default;
  }

  get env() {
    return this._env;
  }

  set values(value) {
    if (typeof value !== 'string') return;
    this._values.push(value);
  }

  resetValues() {
    this._values = ['prod', 'production'];
  }
}

const isDev = new IsDev();

function isDevEnvironment() {
  const result = isDev.default;
  isDevEnvironment.env = isDev.env;
  return result;
}

module.exports = isDevEnvironment;
