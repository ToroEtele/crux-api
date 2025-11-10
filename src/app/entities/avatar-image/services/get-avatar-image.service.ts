import { Service } from 'typedi';
import sharp from 'sharp';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';

import { AvatarImageRepository } from '../avatar-image.repository';
import { AvatarImage } from '../avatar-image.entity';

export interface GetAvatarImageOptions {
  id: string;
}

@Service()
export class GetAvatarImageService {
  constructor(@InjectRepository(AvatarImage) private readonly avatarImageRepository: AvatarImageRepository) {}

  public async getAvatarImage({ id }: GetAvatarImageOptions): Promise<{
    contentType: string;
    content: Buffer;
  } | null> {
    const avatarImage = await this.avatarImageRepository.findOneOrThrow(id);

    if (!avatarImage) {
      return null;
    }

    const bytes = Buffer.from(avatarImage.bytes, 'base64');

    return {
      contentType: 'image/jpeg',
      content: await sharp(bytes).toFormat('jpeg').toBuffer()
    };
  }
}
