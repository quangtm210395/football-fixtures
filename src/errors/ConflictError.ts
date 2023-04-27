import { StatusCodes } from 'http-status-codes';

import { formatWithArgs } from '@Libs/stringHelpers';

import { BasicError } from '@Errors/BasicError';
import { ErrorCode } from '@Errors/ErrorCode';

export class ConflictError extends BasicError {
  constructor(code: ErrorCode, ...args: any[]) {
    super(code.valueOf(), StatusCodes.CONFLICT);
    this.name = 'ConflictError';
    let message = code.toString();
    if (args.length > 0) {
      message = formatWithArgs(message, args);
    }
    this.message = message;
  }
}
