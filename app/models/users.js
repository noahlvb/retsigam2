const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    SecondName: String,
    email: String,
    password: String,
    salt: String,
    groups: Array
}, {timestamps: { createdAt: 'created_at'} })

userSchema.statics.validatePassword = function (password, hashed, salt) {
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256')

    if (hashed === hash.toString('hex')) {
        return true
    }

    return false
}

userSchema.statics.generateHash = function (password) {
    var salt = crypto.randomBytes(64).toString('hex')
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256');

    return { 'hash' : hash.toString('hex'), 'salt' : salt }
}

const userModel = mongoose.model('users', userSchema)

module.exports = userModel

module.exports.add = function (newUser, callback) {
    username = (newUser.firstName + '.' + newUser.secondName.split(' ').pop()).toLowerCase()

    userModel.findOne({username: username}, function (err, document) {
        if (!document) {
            var hashed = userSchema.statics.generateHash(newUser.password)
            var document = {
                username: username,
                firstName: newUser.firstName,
                secondName: newUser.secondName,
                email: newUser.email,
                password: hashed.hash,
                salt: hashed.salt
            }

            new userModel(document).save(function (err, document) {
                if (err) {
                    callback([false, 1])
                } else {
                    callback([true], username)
                }
            })
        } else {
            callback([false, 2])
        }
    })
}

userModel.findOne({ groups: 'admin' }, function (err, document) {
    if (!document) {
        var hashed = userSchema.statics.generateHash('retsigam2')
        var document = {
            username: 'admin',
            password: hashed.hash,
            salt: hashed.salt,
            groups: ['admin']
        }

        new userModel(document).save(function (err, document) {
            if (err) {
                console.error('Could not make admin user')
            } else {
                console.log('Admin account is created. Username: admin, Password: retsigam2')
            }
        })
    }
})
