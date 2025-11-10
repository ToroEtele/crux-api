import { buildSchemaSync } from 'type-graphql';

import type { BuildSchemaOptions } from 'type-graphql';
import type { GraphQLSchema } from 'graphql';

import { GraphQLBuildSchemaOptionsFactory } from './graphqlBuildSchemaOptions.factory';

export class GraphQLSchemaFactory {
  constructor(
    private readonly schemaOptions: BuildSchemaOptions = new GraphQLBuildSchemaOptionsFactory().build()
  ) {}

  // add middleware here
  public build(): GraphQLSchema {
    const schema = this.buildSchema();
    return schema;
  }

  public buildSchema(): GraphQLSchema {
    return buildSchemaSync(this.schemaOptions);
  }
}
