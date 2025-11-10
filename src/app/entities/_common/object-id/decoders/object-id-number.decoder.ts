import { ObjectIdBaseDecoder } from './object-id-base.decoder';

export class ObjectIdNumberDecoder extends ObjectIdBaseDecoder {
  protected override getId(): number {
    const id = super.getId();
    const numberId = Number(id);
    if (isNaN(numberId) || numberId <= 0) throw new Error(this.errorMessage);
    return numberId;
  }
}
