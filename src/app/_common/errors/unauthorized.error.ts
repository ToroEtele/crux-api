import { ApiError } from './api.error';
import { ErrorCode } from './constants/error-codes.enum';

export class UnauthorizedError extends ApiError {
  constructor() {
    super(ErrorCode.Unauthorized);
  }
}
