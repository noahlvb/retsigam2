const crypto = require('crypto')

module.exports = function (password) {
    var salt = crypto.randomBytes(64).toString('hex')
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256');

    return { 'hash' : hash.toString('hex'), 'salt' : salt }
}
