const KB = (size: number) => {
  return size * 1024;
};

const MB = (size: number) => {
  return KB(1024 * size);
};

const GB = (size: number) => {
  return MB(1024 * size);
};

const TB = (size: number) => {
  return MB(1024 * size);
};

const dataSize = { KB, MB, GB, TB };

export default dataSize;
