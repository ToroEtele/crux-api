import { GraphQLScalarType, Kind } from 'graphql';

import { InternalServerError } from '../../../_common/errors/internal-server.error';

import { ObjectId } from './object-id';

const ObjectIdScalarFactory = (name = 'ObjectID'): GraphQLScalarType => {
  const description = [
    `The ${name} scalar type represents a unique identifier, often used to refetch an object or as key for a cache.`,
    `The ${name} type appears in a JSON response as a String; however, it is not intended to be human-readable.`
  ].join(' ');

  return new GraphQLScalarType({
    name,
    description,
    parseValue: (value: unknown): ObjectId => {
      if (typeof value === 'string' || typeof value === 'number') {
        return ObjectId.parse(value);
      }

      throw new InternalServerError('Unsupported ObjectIdScalar value encountered during parsing!', {
        value
      });
    },
    serialize: (value: unknown): string => {
      if (value instanceof ObjectId) {
        return value.toUrlSafeBase64String();
      }

      throw new InternalServerError('Unsupported ObjectIdScalar value encountered during serializing!', {
        value
      });
    },
    parseLiteral: (ast): ObjectId | undefined => {
      if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
        return ObjectId.parse(ast.value);
      }
      return undefined;
    }
  });
};

export const ObjectIdScalar = ObjectIdScalarFactory();
