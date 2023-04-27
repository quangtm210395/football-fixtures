import { ValidationError } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

export class ArgumentValidationError extends Error {
  errors: ValidationError[];
  httpCode: StatusCodes;

  constructor(validationErrors: ValidationError[], httpCode?: StatusCodes) {
    super(`Invalid request, check 'errors' property for more info`);
    this.errors = validationErrors;
    this.httpCode = httpCode || StatusCodes.BAD_REQUEST;
    this.name = 'ArgumentValidationError';
  }

  toString() {
    return JSON.stringify({ name: this.name, message: this.message, httpCode: this.httpCode });
  }
}
