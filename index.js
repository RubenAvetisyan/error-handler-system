const { errorHandler } = require('./error-handler.js');

process.on('unhandledRejection', reason => {
  throw reason instanceof Error ? reason : new Error(String(reason));
});

process.on('uncaughtException', error => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    Object.keys(require.cache).forEach(key => delete require.cache[key]);
    process.exit(1);
  }
});
