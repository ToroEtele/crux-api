import { GraphQLErrorExtensions } from 'graphql';
import { Maybe } from 'type-graphql';

import { ErrorCode } from './constants/error-codes.enum';
import { ApiError } from './api.error';

export class InternalServerError extends ApiError {
  constructor(message: string, extensions?: GraphQLErrorExtensions, originalError?: Maybe<Error>) {
    super(ErrorCode.InternalServerError, { extensions, message, originalError, internal: true });
  }
}
