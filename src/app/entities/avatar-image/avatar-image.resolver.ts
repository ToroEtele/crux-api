import { Arg, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { InjectScoped } from '@access-control/scoping/inject-scoped.decorator';
import { ObjectId } from '@entities/_common/object-id/object-id';

import { AvatarImage } from './avatar-image.entity';
import { User } from '@entities/user/user.entity';

import { UpdateAvatarImageService } from './services/update-avatar-image.service';
import { AvatarImageRepository } from './avatar-image.repository';
import { AvatarImageBaseResolver } from '@entities/_generated/entity-base-resolvers/avatar-image.base-resolver';

@Service()
@Resolver((_of) => AvatarImage)
export class AvatarImageResolver extends AvatarImageBaseResolver {
  constructor(
    @InjectRepository(AvatarImage) private readonly repository: AvatarImageRepository,
    @Inject((_type) => UpdateAvatarImageService) private readonly updateAvatarImageService: UpdateAvatarImageService
  ) {
    super(repository);
  }

  @Mutation((_type) => AvatarImage, { nullable: true })
  public async updateAvatarImage(
    @Arg('userId', (_type) => ObjectId) userId: ObjectId,
    @Arg('bytes', (_type) => String, { nullable: true }) bytes: string | null,
    @InjectScoped('userId.id', User) user: User
  ): Promise<AvatarImage | null> {
    return await this.updateAvatarImageService.updateAvatarImage(user, bytes);
  }
}
