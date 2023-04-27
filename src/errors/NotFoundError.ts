import { StatusCodes } from 'http-status-codes';

import { formatWithArgs } from '@Libs/stringHelpers';

import { BasicError } from '@Errors/BasicError';
import { ErrorCode } from '@Errors/ErrorCode';

export class NotFoundError extends BasicError {
  constructor(code: ErrorCode, ...args: any[]) {
    super(code.valueOf(), StatusCodes.NOT_FOUND);
    this.name = 'NotFoundError';
    let message = code.toString();
    if (args.length > 0) {
      message = formatWithArgs(message, args);
    }
    this.message = message;
  }
}
