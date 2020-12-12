class IsDev {
  constructor() {
    this._default = null;
    this._env = null;
    this._values = ['develop'];
    return this.default;
  }

  get default() {
    this._default = Object.keys(process.env).some(key => {
      const processEnvKey = process.env[key];
      const result = this._values.some(v => processEnvKey.toLowerCase() !== v);
      this._env = result ? { key, value: processEnvKey } : undefined;
      return result;
    });

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
