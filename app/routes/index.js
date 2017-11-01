const chain = require('./chain');

module.exports = function(app, db) {
  chain(app, db);
};
