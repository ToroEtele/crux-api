import { ApiError } from './api.error';
import { ErrorCode } from './constants/error-codes.enum';

export class EntityNotFoundError extends ApiError {
  constructor(entityType: string) {
    super(ErrorCode.EntityNotFound, { extensions: { entityType } });
  }
}
