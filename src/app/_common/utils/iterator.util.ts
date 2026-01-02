 
export class IteratorUtil {
   
  public static async *createAsyncIterable<T>(iterable: Iterable<T>): AsyncIterable<T> {
    for (const elem of iterable) {
      yield elem;
    }
  }
}
