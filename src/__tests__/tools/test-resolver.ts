import { Query } from 'type-graphql';
import { Service } from 'typedi';

@Service()
export class TestResolver {
  @Query()
  public test(): string {
    return 'I am a test placeholder query';
  }

  @Query({ complexity: 10 })
  public prettyComplex(): string {
    return 'I am a pretty complex query, complexity = 10';
  }

  @Query({ complexity: 9000 })
  public totallyComplex(): string {
    return 'I am a totally complex query, complexity = 9000';
  }
}
