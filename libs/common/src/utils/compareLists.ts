const compareLists = <T, R>(
  existingList: Array<T> = [],
  newList: Array<R> = [],
  areEqual?: (existingItem: T, newItem: R) => boolean,
  updateUnchanged?: (existingItem: T, newItem: R) => any
): {
  removed: Array<T>;
  newItems: Array<R>;
  unchanged: Array<T>;
} => {
  const removed: Array<T> = [];
  const newItems: Array<R> = [];
  const unchanged: Array<T> = [];

  const compare = areEqual || ((a, b: any) => a === b);

  existingList.forEach((item) => {
    const newItem = newList.find((x) => compare(item, x));
    if (newItem) {
      unchanged.push(updateUnchanged ? updateUnchanged(item, newItem) : item);
    } else {
      removed.push(item);
    }
  });

  newItems.push(...newList.filter((x) => !existingList.find((y) => compare(y, x))));

  return { removed, newItems, unchanged };
};

export default compareLists;
