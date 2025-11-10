import { UserInputError } from '@errors/user-input.error';
import { Base64Util } from '@utils/base64.util';

import { objectIdDecoderMapping } from './decoders/object-id-decoder.mapping';
import { objectIdInvalidMessage } from './object-id.error-messages';
import { IObjectId } from './object-id.interface';

export class ObjectIdUnmarshaller {
  private errorMessage = objectIdInvalidMessage;

  constructor(private globalId: string) {}

  public toObjectId(): IObjectId {
    const encodedId = Base64Util.decodeUrlSafe(this.globalId);
    const idType = encodedId[0];
    const decoder = objectIdDecoderMapping.get(idType);
    if (!decoder) throw new UserInputError(this.errorMessage);
    // eslint-disable-next-line new-cap
    return new decoder(encodedId).decode();
  }
}
