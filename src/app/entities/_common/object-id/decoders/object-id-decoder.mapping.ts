import { Constructable } from '../../../../_common/base-types/constructable.type';

import { ObjectIdBaseDecoder } from './object-id-base.decoder';
import { ObjectIdNumberDecoder } from './object-id-number.decoder';
import { ObjectIdStringDecoder } from './object-id-string.decoder';

export const objectIdDecoderMapping = new Map<string, Constructable<ObjectIdBaseDecoder>>([
  ['N', ObjectIdNumberDecoder],
  ['S', ObjectIdStringDecoder]
]);
