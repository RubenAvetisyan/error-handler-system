const { HttpClientErrorStatusCode, HttpServerErrorStatusCode } = require('./http-status-code.js')
const BaseError = require('./base-error.js')

const serverErrorStatusCode = new HttpServerErrorStatusCode()
const clientErrorStatusCode = new HttpClientErrorStatusCode()

class APIError extends BaseError {
  constructor(
    name,
    httpCode = serverErrorStatusCode.INTERNAL_SERVER_ERROR,
    isOperational = true,
    description = 'internal server error'
  ) {
    super(name, httpCode, isOperational, description);
  }
}

class HTTP400Error extends BaseError {
 constructor(description = 'bad request') {
   super('BAD REQUEST', clientErrorStatusCode.BAD_REQUEST, true, description);
 }
}

module.exports = {APIError, HTTP400Error}