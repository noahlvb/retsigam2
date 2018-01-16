const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    secondName: String,
    email: String,
    password: String,
    salt: String,
    groups: Array
}, {timestamps: { createdAt: 'created_at'} })

userSchema.index({ username: 1 }, { unique: true })

userSchema.statics.validatePassword = require('./validatePassword')
userSchema.statics.generateHash = require('./generateHash')
userSchema.methods.group = require('./group')
userSchema.statics.add = require('./new')

const userModel = mongoose.model('users', userSchema)

module.exports = userModel

userModel.findOne({ groups: 'admin' }, function (err, document) {
    if (!document) {
        var hashed = userSchema.statics.generateHash('retsigam2')
        var document = {
            username: 'admin',
            firstName: 'Admin',
            secondName: 'van der Nol',
            email: 'test@test.nl',
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
