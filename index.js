const { errorHandler } = require('./error-handler.js');

process.env.NODE_ENV = 'PROD';

process.on('unhandledRejection', (reason, promise) => {
  throw { reason, promise };
});

process.on('uncaughtException', error => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    Object.keys(require.cache).forEach(key => delete require.cache[key]);
    process.exit(1);
  }
});
