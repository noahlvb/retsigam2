const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const users = require('./../models/users')

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id)
    })

    passport.deserializeUser(function (id, done) {
        users.findById(id, function (err, document) {
            done(err, document)
        })
    })

    passport.use(new localStrategy(function (username, password, done) {
        process.nextTick(function () {
            users.findOne({ 'username' : username }, function (err, document) {
                if (err) {
                    return done(err)
                }

                if (!document) {
                    return done(null, false, { message : 'Username or password is invalid!'})
                }

                isValidPassword = users.validatePassword(password, document.password, document.salt)

                if (isValidPassword === false) {
                    return done(null, false, { message : 'Username or password is invalid!'})
                }

                return done(null, document)
            })
        })
    }))
}
