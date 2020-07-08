const createRawValues = (values: Array<string>): string => {
  return values.reduce((acc, cur, index) => {
    return acc + `'${cur}'` + (index === values.length - 1 ? '' : ', ');
  }, '');
};

export default createRawValues;
