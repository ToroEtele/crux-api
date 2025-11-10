export async function resolveInSequence<T>(promises: Array<Promise<T> | T>): Promise<T[]> {
  return await promises.reduce(async (acc, promise) => {
    const tempAcc = await acc;
    return tempAcc.concat(await promise);
  }, Promise.resolve(new Array<T>()));
}
