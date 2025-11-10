import { GraphQLErrorExtensions } from 'graphql';

import { Maybe } from '../base-types/maybe.type';

import { ApiError } from './api.error';
import { ErrorCode } from './constants/error-codes.enum';

export class UserInputError extends ApiError {
  constructor(message?: string, extensions?: GraphQLErrorExtensions, originalError?: Maybe<Error>) {
    super(ErrorCode.BadUserInput, { message, extensions, originalError });
  }
}
