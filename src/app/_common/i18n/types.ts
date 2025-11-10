import { registerGraphQLEnum } from '@entities/_common/decorators/register-graphql-enum';

export enum GraphLocale {
  English = 'en',
  Romanian = 'ro',
  Hungarian = 'hu'
}

registerGraphQLEnum(GraphLocale, {
  name: 'FarmLocale',
  filterTypeOptions: {
    name: 'FarmLocale',
    filePath: __filename
  }
});

export { type TFunction as TranslateFunc } from 'i18next';
