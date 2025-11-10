export class SymbolKeysNotSupportedError extends Error {
  constructor() {
    super('Symbol keys not supported');
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
