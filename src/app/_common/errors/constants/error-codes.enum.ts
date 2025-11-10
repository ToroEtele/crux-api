export enum ErrorCode {
  BadUserInput = 'BAD_REQUEST',
  EntityNotFound = 'ENTITY_NOT_FOUND',
  Unauthenticated = 'UNAUTHENTICATED',
  Unauthorized = 'UNAUTHORIZED',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  SomethingWentWrong = 'SOMETHING_WENT_WRONG',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  UserExists = 'USER_EXISTS',
  FeatureFlagDisabled = 'FEATURE_FLAG_DISABLED',
  InvalidObjectIdType = 'INVALID_OBJECT_ID_TYPE'
}
