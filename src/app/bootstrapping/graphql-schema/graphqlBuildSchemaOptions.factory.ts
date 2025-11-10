import { BuildSchemaOptions } from 'type-graphql';
import Container from 'typedi';

import { ObjectIdScalar } from '@entities/_common/object-id/object-id.scalar';
import { ObjectId } from '@entities/_common/object-id/object-id';
// import { authChecker } from '@/app/entities/_common/auth/auth-checker';
import resolvers from './resolvers';

export class GraphQLBuildSchemaOptionsFactory {
  public scalarsMap = [
    {
      type: ObjectId,
      scalar: ObjectIdScalar
    }
  ];

  public build(): BuildSchemaOptions {
    return {
      authChecker: () => true,
      resolvers,
      container: Container,
      emitSchemaFile: 'schemas/public.graphql',
      scalarsMap: this.scalarsMap,
      validate: {
        skipUndefinedProperties: true,
        skipMissingProperties: false,
        skipNullProperties: false
      }
    };
  }
}
