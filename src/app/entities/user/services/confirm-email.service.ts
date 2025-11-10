import { Service } from 'typedi';

import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { OrderDirection } from '@query-building/sorting/constants/order-direction.enum';
import { VerificationToken } from '@entities/verification-token/verification-token.entity';
import { User } from '../user.entity';

import { VerificationTokenRepository } from '@entities/verification-token/verification-token.repository';
import { UserRepository } from '../user.repository';

import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';
import { EmailVerificationState } from '../enums/email-verification-state.enum';
import { TypeORMTransaction } from '@entity-management/external-providers/typeorm/decorators/typeorm-transaction.decorator';

@Service()
export class ConfirmEmailService {
  constructor(
    @InjectRepository(VerificationToken) private verificationTokenRepository: VerificationTokenRepository,
    @InjectRepository(User) private userRepository: UserRepository
  ) {}

  @TypeORMTransaction()
  async verifyEmail(token: string, user: User, transactionalEntityManager?: TypeORMEntityManager): Promise<EmailVerificationState> {
    const verificationToken = await this.verificationTokenRepository
      .createQueryBuilder()
      .where({ value: { eq: token } })
      .getOne();

    if (!verificationToken) {
      return EmailVerificationState.NOT_FOUND;
    }

    const valid = verificationToken.expiresAt > new Date();

    if (!valid) {
      // const mostRecentToken = await this.getMostRecentVerificationTokenByUserId({ userId: user.id });

      // if (!mostRecentToken || DateTime.now().minus({ hours: 1 }).toJSDate() > mostRecentToken.createdAt) {
      //   await this.sendConfirmationEmail( User)
      // }

      return EmailVerificationState.EXPIRED;
    }

    await this.userRepository.update(user, { emailVerified: true }, { transactionalEntityManager });

    const oldTokens = await this.verificationTokenRepository
      .createQueryBuilder({ transactionalEntityManager })
      .where({ expiresAt: { lt: new Date() } })
      .getMany();

    await Promise.all(oldTokens.map(async (token) => await this.verificationTokenRepository.remove(token, { transactionalEntityManager })));

    return EmailVerificationState.VERIFIED;
  }

  private async getMostRecentVerificationTokenByUserId(
    { userId }: { userId: number },
    transactionalEntityManager?: TypeORMEntityManager
  ): Promise<VerificationToken | null> {
    const verificationToken = await this.verificationTokenRepository
      .createQueryBuilder({ transactionalEntityManager })
      .where({ identifier: { eq: userId.toString() } })
      .orderBy('createdAt', OrderDirection.DESC)
      .take(1)
      .getOne();

    return verificationToken;
  }
}
