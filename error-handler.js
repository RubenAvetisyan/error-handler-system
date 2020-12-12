const BaseError = require('./base-error.js');
const { logger } = require('./logger.js');

function sendMailToAdminIfCritical(err) {
  logger.warn('Wake up Admin!!! ', err);
}

function sendEventsToSentry(err) {
  logger.info('Wake up Sentry!!! ', err);
}

class ErrorHandler {
  async handleError(err) {
    await logger.error(
      'Error message from the centralized error-handling component',
      err,
    );
    await sendMailToAdminIfCritical(err);
    await sendEventsToSentry(err);
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

module.exports.errorHandler = new ErrorHandler();
