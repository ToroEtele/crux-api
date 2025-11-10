import { Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';

import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Service()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

  public async findEnabledUserById(id: number | string): Promise<User | null> {
    const user = await this.userRepository.findOneOrThrow(id);
    if (user && !user.banned) {
      return user;
    }
    return null;
  }
}
