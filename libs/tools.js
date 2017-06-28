var crypto = require('crypto');

var genRevision = function () {
  return Math.random().toString(36).substr(2, 10);
};

var genHash = function(string, hashType) {
  return crypto.createHash(hashType).update(string).digest('hex');
}

module.exports.genRevision = genRevision;
module.exports.genHash = genHash;
