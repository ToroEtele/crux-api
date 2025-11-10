import { createParameterDecorator } from 'type-graphql';

import { RequesterContext } from '../requester-context';

export const AuthContext = (): ReturnType<typeof createParameterDecorator> => createParameterDecorator<RequesterContext>(({ context }) => context.authContext);

export const Context = (): ReturnType<typeof createParameterDecorator> => createParameterDecorator<RequesterContext>(({ context }) => context);
