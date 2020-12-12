const { APIError, HTTP400Error } = require('./api-error.js')
const {HttpClientErrorStatusCode} = require('./http-status-code.js')

const { errorHandler } = require('./error-handler.js')

const clientErrorStatusCode = new HttpClientErrorStatusCode()

process.env.NODE_ENV = 'PROD'

process.on('unhandledRejection', (reason, promise) => {
  throw reason;
});

process.on('uncaughtException', (error) => {
 errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    Object.keys(require.cache).forEach(key => delete require.cache[key])
   process.exit(1);
 }
});
