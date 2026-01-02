import { registerGraphQLEnum } from '@entities/_common/decorators/register-graphql-enum';

export enum Grade {
  G6A = '6A',
  G6A_PLUS = '6A+',
  G6B = '6B',
  G6B_PLUS = '6B+',
  G6C = '6C',
  G6C_PLUS = '6C+',

  G7A = '7A',
  G7A_PLUS = '7A+',
  G7B = '7B',
  G7B_PLUS = '7B+',
  G7C = '7C',
  G7C_PLUS = '7C+',

  G8A = '8A',
  G8A_PLUS = '8A+',
  G8B = '8B',
  G8B_PLUS = '8B+',
  G8C = '8C',
  G8C_PLUS = '8C+'
}

registerGraphQLEnum(Grade, {
  name: 'Grade',
  filterTypeOptions: {
    name: 'Grade',
    filePath: __filename
  }
});
