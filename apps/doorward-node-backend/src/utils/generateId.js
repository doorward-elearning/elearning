const shortId = require('shortid');

const generateId = () => {
  return Array(3)
    .fill(0)
    .reduce(acc => acc + shortId.generate(), '');
};

module.exports = generateId;
