import type { Server } from 'http';

import type { GraphQLSchema } from 'graphql';

export default interface IApolloServerFactoryArgs {
  schema: GraphQLSchema;
  enableSchemaTransformations?: boolean;
  httpServer?: Server;
}
