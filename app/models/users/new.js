module.exports = function (newUser, callback) {
    username = (newUser.firstName + '.' + newUser.secondName.split(' ').pop()).toLowerCase()

    this.findOne({username: username}, function (err, document) {
        if (!document) {
            var hashed = require('./generateHash')(newUser.password)
            var document = {
                username: username,
                firstName: newUser.firstName,
                secondName: newUser.secondName,
                email: newUser.email,
                password: hashed.hash,
                salt: hashed.salt
            }

            new this(document).save(function (err, document) {
                if (err) {
                    callback([false, 1])
                } else {
                    callback([true], username)
                }
            })
        } else {
            callback([false, 2])
        }
    }.bind(this))
}
