import { Constructable } from '@common/base-types/constructable.type';
import { ApiError } from './api.error';
import { i18nService } from '@bootstrapping/services/i18n.bootstrapable';

export class ReferencedEntityError<TEntity> extends ApiError {
  constructor(originalError: Error, entityClass: Constructable<TEntity>) {
    const errorMessageKey = `errors.referenced-entity.${entityClass.name.toLowerCase()}.message`;
    const translatedMessage = i18nService.exists(errorMessageKey) ? i18nService.t(errorMessageKey) : i18nService.t('errors.referenced-entity.default.message');
    super(ApiError.ErrorCodes.BadUserInput, { message: translatedMessage, originalError });
  }
}
