const users = require('./../models/users')

module.exports = function (req, res, next) {
    users.find({}, function (err, document) {
        res.locals.autocompleteUsers = {}
        for (user of document) {
            res.locals.autocompleteUsers[user.username] = null
        }

        next()
    })
}
