import { Inject, Service } from 'typedi';
import { GraphQLError } from 'graphql';

import { TypeORMTransaction } from '@entity-management/external-providers/typeorm/decorators/typeorm-transaction.decorator';
import { TypeORMEntityManager } from '@entity-management/external-providers/typeorm/typeorm-entity-manager.adapter';
import { InjectRepository } from '@entity-management/decorators/inject-repository.decorator';
import { IRequesterAuthContext } from '@interfaces/requester-context.interface';
import { PasswordService } from './password.service';

import { UserSecurityAuditLog } from '@entities/user-security-audit-log/user-security-audit-log.entity';
import { PasswordResetToken } from '@entities/password-reset-token/password-reset-token.entity';
import { User } from '../user.entity';

import { UserSecurityAuditLogRepository } from '@entities/user-security-audit-log/user-security-audit-log.repository';
import { PasswordResetTokenRepository } from '@entities/password-reset-token/password-reset-token.repository';
import { UserRepository } from '../user.repository';

import { UserSecurityAuditLogType } from '@entities/user-security-audit-log/enum/document-data-type.enum';
import { ResetPasswordInput } from '../types/reset-password.input-type';

@Service()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(UserSecurityAuditLog) private userSecurityAuditLogRepository: UserSecurityAuditLogRepository,
    @InjectRepository(PasswordResetToken) private passwordResetTokenRepository: PasswordResetTokenRepository,
    @InjectRepository(User) private userRepository: UserRepository,
    @Inject((_type) => PasswordService) private passwordService: PasswordService
  ) {}

  @TypeORMTransaction()
  async resetPassword(
    { token, password, context }: ResetPasswordInput & { context: IRequesterAuthContext },
    transactionalEntityManager?: TypeORMEntityManager
  ): Promise<boolean> {
    if (!token) throw new GraphQLError('Invalid token provided');

    const found = await this.passwordResetTokenRepository
      .createQueryBuilder()
      .where({ token: { eq: token } })
      .getOne();

    if (!found) throw new GraphQLError('Invalid token provided. Please try again.');

    const now = new Date();

    if (now > found.expires) {
      throw new GraphQLError('Token has expired. Please try again.');
    }

    const user = await this.userRepository.findOneOrThrow(found.userId);

    // const isSamePassword = await this.passwordService.validate(password, user.passwordHash ?? '');

    // if (isSamePassword) {
    //   throw new GraphQLError('Your new password cannot be the same as your old password.');
    // }

    // const passwordHash = await this.passwordService.encrypt(password);

    // await this.userRepository.update(user, { passwordHash }, { transactionalEntityManager });

    const allTokens = await this.passwordResetTokenRepository
      .createQueryBuilder({ transactionalEntityManager })
      .where({ userId: { eq: user.id } })
      .getMany();

    await Promise.all(allTokens.map(async (token) => await this.passwordResetTokenRepository.remove(token, { transactionalEntityManager })));

    await this.userSecurityAuditLogRepository.buildAndSave({
      user,
      type: UserSecurityAuditLogType.PASSWORD_RESET,
      ipAddress: context.ip,
      userAgent: context.userAgent
    });

    return true;
  }
}
