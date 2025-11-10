import { createParameterDecorator } from 'type-graphql';

import { RequesterContext } from '../requester-context';

export const CurrentUser = (): ReturnType<typeof createParameterDecorator> =>
  createParameterDecorator<RequesterContext>(({ context }) => context.authContext.user);
