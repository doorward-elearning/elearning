const shortId = require('shortid');

module.exports = () => {
  return Array(3)
    .fill(0)
    .reduce(acc => acc + shortId.generate(), '');
};
