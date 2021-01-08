/**
 * Prints an object with formatted text to console.
 *
 * @param object
 */
const printObject = (object: any) => {
  let result = '';
  try {
    result = JSON.stringify(object);
  } catch (e) {
    result = object;
  }

  return result;
};

export default printObject;
