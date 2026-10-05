/**
 * Base HTTP Error class that extends Error
 * All HTTP error classes should extend this
 */
export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = "HttpError"
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

// MARK: 4xx Client Errors

/**
 * 400 Bad Request
 * The server cannot process the request due to client error
 */
export class BadRequest extends HttpError {
  constructor(message: string = "Bad Request") {
    super(400, message)
    this.name = "BadRequest"
    Object.setPrototypeOf(this, BadRequest.prototype)
  }
}

/**
 * 401 Unauthorized
 * Authentication is required
 */
export class Unauthorized extends HttpError {
  constructor(message: string = "Unauthorized") {
    super(401, message)
    this.name = "Unauthorized"
    Object.setPrototypeOf(this, Unauthorized.prototype)
  }
}

/**
 * 403 Forbidden
 * The client does not have access rights to the content
 */
export class Forbidden extends HttpError {
  constructor(message: string = "Forbidden") {
    super(403, message)
    this.name = "Forbidden"
    Object.setPrototypeOf(this, Forbidden.prototype)
  }
}

/**
 * 404 Not Found
 * The server cannot find the requested resource
 */
export class NotFound extends HttpError {
  constructor(message: string = "Not Found") {
    super(404, message)
    this.name = "NotFound"
    Object.setPrototypeOf(this, NotFound.prototype)
  }
}

/**
 * 409 Conflict
 * The request conflicts with the current state of the server
 */
export class Conflict extends HttpError {
  constructor(message: string = "Conflict") {
    super(409, message)
    this.name = "Conflict"
    Object.setPrototypeOf(this, Conflict.prototype)
  }
}

/**
 * 422 Unprocessable Entity
 * The request is well-formed but contains semantic errors
 */
export class UnprocessableEntity extends HttpError {
  constructor(message: string = "Unprocessable Entity") {
    super(422, message)
    this.name = "UnprocessableEntity"
    Object.setPrototypeOf(this, UnprocessableEntity.prototype)
  }
}

/**
 * 429 Too Many Requests
 * The user has sent too many requests in a given amount of time
 */
export class TooManyRequests extends HttpError {
  constructor(message: string = "Too Many Requests") {
    super(429, message)
    this.name = "TooManyRequests"
    Object.setPrototypeOf(this, TooManyRequests.prototype)
  }
}

// MARK: 5xx Server Errors

/**
 * 500 Internal Server Error
 * The server encountered an unexpected condition
 */
export class InternalServerError extends HttpError {
  constructor(message: string = "Internal Server Error") {
    super(500, message)
    this.name = "InternalServerError"
    Object.setPrototypeOf(this, InternalServerError.prototype)
  }
}

/**
 * 501 Not Implemented
 * The server does not support the functionality required to fulfill the request
 */
export class NotImplemented extends HttpError {
  constructor(message: string = "Not Implemented") {
    super(501, message)
    this.name = "NotImplemented"
    Object.setPrototypeOf(this, NotImplemented.prototype)
  }
}

/**
 * 502 Bad Gateway
 * The server received an invalid response from an upstream server
 */
export class BadGateway extends HttpError {
  constructor(message: string = "Bad Gateway") {
    super(502, message)
    this.name = "BadGateway"
    Object.setPrototypeOf(this, BadGateway.prototype)
  }
}

/**
 * 503 Service Unavailable
 * The server is currently unable to handle the request
 */
export class ServiceUnavailable extends HttpError {
  constructor(message: string = "Service Unavailable") {
    super(503, message)
    this.name = "ServiceUnavailable"
    Object.setPrototypeOf(this, ServiceUnavailable.prototype)
  }
}
