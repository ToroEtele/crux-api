import { AuthCheckerFn } from 'type-graphql';

import { IRequesterAuthContext, IRequesterContext } from '@common/interfaces/requester-context.interface';

export const userAuthChecker = (permissions: any | undefined, requiredPermissions: any[]): boolean => {
  if (!permissions) return false;
  if (requiredPermissions.length === 0) return true;
  return true;
};

export const authChecker: AuthCheckerFn<IRequesterContext, any> = ({ context: { authContext } }, permissions) => userAuthChecker(authContext.user, permissions);

export function isSystemAdmin(authContext: IRequesterAuthContext): boolean {
  return false;
}
