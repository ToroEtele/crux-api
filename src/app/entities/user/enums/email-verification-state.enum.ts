import { registerEnumType } from 'type-graphql';

export enum EmailVerificationState {
  NOT_FOUND = 'NOT_FOUND',
  VERIFIED = 'VERIFIED',
  EXPIRED = 'EXPIRED',
  ALREADY_VERIFIED = 'ALREADY_VERIFIED'
}

registerEnumType(EmailVerificationState, {
  name: 'EmailVerificationState',
  description: 'The status of the email verification'
});
