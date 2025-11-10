import { Base64Util } from '@utils/base64.util';

import { ObjectId } from './object-id';

export class ObjectIdMarshaller {
  private paddingSize = 3;
  private typeLength = 0;

  constructor(private objectId: ObjectId) {
    if (objectId.type) this.typeLength = objectId.type.length;
  }

  public toUrlSafeBase64String(): string {
    return Base64Util.encodeUrlSafe(this.marshall());
  }

  // N + 008 + TypeName + 1 -> N008TypeName1
  // S + 008 + TypeName + StringId -> S008TypeNameStringId
  public marshall(): string {
    return [this.objectId.idType, this.paddedTypeLength(), this.objectId.type, this.objectId.id].join('');
  }

  private paddedTypeLength(): string {
    return this.typeLength.toString().padStart(this.paddingSize, '0');
  }
}
