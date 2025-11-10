export class StrictMap<TKey, TValue> extends Map<TKey, TValue> {
  constructor(
    private readonly name: string,
    entries: ReadonlyArray<readonly [TKey, TValue]>
  ) {
    super(entries);
  }

  public fetch(key: TKey): TValue {
    const value = this.getKey(key);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    if (!value) throw new Error(`Unknown mapping found in "${this.name}" for "${key}".`);
    return value;
  }

  public getKey(key: TKey): TValue | undefined {
    return super.get(key);
  }
}
