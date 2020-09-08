
type Callback<T> = (item: T, index: number) => Promise<boolean>

const findAsync = async <T>(array: Array<T>, callback: Callback<T>): Promise<T> => {
  const promises = await Promise.all(array.map(callback));

  const index = promises.findIndex((promise) => promise);

  return array[index];
};


export default findAsync;
