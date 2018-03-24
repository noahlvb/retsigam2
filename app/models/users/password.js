module.exports = function (password, passwordConfirm, callback) {
    if (password !== passwordConfirm) {
        return callback('notSame')
    }

    let hashed = require('./generateHash')(password)

    this.password = hashed.hash
    this.salt = hashed.salt
    this.save()
    callback()
}
