const crypto = require('crypto')

module.exports = validatePassword = function (password, hashed, salt) {
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256')

    if (hashed === hash.toString('hex')) {
        return true
    }

    return false
}
