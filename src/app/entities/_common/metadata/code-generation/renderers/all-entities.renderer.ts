import { join as pathJoin } from 'node:path';
import { kebabCase } from 'lodash';

import { TypescriptRenderer } from '@code-generation/base-types/typescript-renderer.base';
import { Database } from '@entity-management/constants/database.enum';
import { metadataManager, MetadataType } from '@common/metadata';

interface IAllEntitiesRendererData {
  abstractEntities: Function[];
  allEntities: Array<{ name: string; path: string }>;
  databaseEntities?: Map<Database, Function[]>;
  elasticSearchEntities: Function[];
  nonAbstractEntities: Function[];
  nonRetrievableEntities: Function[];
  retrievableEntities: Function[];
}

export class AllEntitiesRenderer extends TypescriptRenderer<IAllEntitiesRendererData> {
  constructor() {
    super(pathJoin(__dirname, '../constants/all-entities.ejs'));
  }

  protected get templateData(): IAllEntitiesRendererData {
    const entities = metadataManager.getClassesWithMetadataType(MetadataType.Entity);
    const allEntities = new Array<{ name: string; path: string }>();
    const abstractEntities = new Array<Function>();
    const databaseEntities = new Map<Database, Function[]>(Object.values(Database).map((database) => [database, []]));
    const nonAbstractEntities = new Array<Function>();
    const nonRetrievableEntities = new Array<Function>();
    const retrievableEntities = new Array<Function>();

    entities.forEach((entityKlass) => {
      const { abstract, database, path, retrievable } = metadataManager.fetchClassMetadata(entityKlass, MetadataType.Entity);

      allEntities.push({ name: entityKlass.name, path: path ?? kebabCase(entityKlass.name) });
      abstract ? abstractEntities.push(entityKlass) : nonAbstractEntities.push(entityKlass);
      if (database) databaseEntities.get(database)?.push(entityKlass);
      if (retrievable && !abstract) retrievableEntities.push(entityKlass);
      if (!(retrievable || abstract)) nonRetrievableEntities.push(entityKlass);
    });

    return {
      allEntities,
      nonAbstractEntities,
      abstractEntities,
      nonRetrievableEntities,
      retrievableEntities,
      databaseEntities,
      elasticSearchEntities: [] // TODO: Implement elastic search entities
    };
  }
}
