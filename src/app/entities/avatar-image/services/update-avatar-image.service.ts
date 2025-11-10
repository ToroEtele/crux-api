import { Service } from 'typedi';
import sharp from 'sharp';

import { TypeORMTransaction } from '@entity-management/external-providers/typeorm/decorators/typeorm-transaction.decorator';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';
import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';

import { AvatarImage } from '../avatar-image.entity';
import { User } from '@entities/user/user.entity';

import { AvatarImageRepository } from '../avatar-image.repository';
import { UserRepository } from '@entities/user/user.repository';

@Service()
export class UpdateAvatarImageService {
  constructor(
    @InjectRepository(AvatarImage) private readonly avatarImageRepository: AvatarImageRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository
  ) {}

  @TypeORMTransaction()
  public async updateAvatarImage(user: User, bytes?: string | null, transactionalEntityManager?: TypeORMEntityManager): Promise<AvatarImage | null> {
    if (user.avatarImageId) {
      const oldAvatarImage = await this.avatarImageRepository.findOneOrThrow(user.avatarImageId);
      await this.avatarImageRepository.remove(oldAvatarImage, { transactionalEntityManager });
    }

    let newAvatarImage: AvatarImage | null = null;

    if (bytes) {
      const optimisedBytes = await sharp(Buffer.from(bytes, 'base64')).resize(512, 512).toFormat('jpeg', { quality: 75 }).toBuffer();

      const avatarImage = await this.avatarImageRepository.buildAndSave(
        {
          bytes: optimisedBytes.toString('base64')
        },
        { transactionalEntityManager }
      );

      newAvatarImage = avatarImage;
    }

    if (newAvatarImage) {
      await this.userRepository.update(user, { avatarImageId: newAvatarImage.id }, { transactionalEntityManager });
    }

    return newAvatarImage;
  }
}
