export class IteratorUtil {
  // eslint-disable-next-line @typescript-eslint/require-await
  public static async *createAsyncIterable<T>(iterable: Iterable<T>): AsyncIterable<T> {
    // eslint-disable-next-line no-loops/no-loops
    for (const elem of iterable) {
      yield elem;
    }
  }
}
