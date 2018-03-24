const users = require('./../../../models/users')

module.exports = function (req, res) {

    for (var key in req.body) {
        if (req.body[key].length <= 0) {
            req.flash('warning', 'Not all fields are filled in')
            return res.redirect('/account/manage/add')
        }
    }

    users.add(req.body, function (feedback, username) {
        if (feedback[0] === true) {
            req.flash('info','The new user was created succesfully created with username: ' + username)
            res.redirect('/account/manage')
        } else {
            if (feedback[1] == 1) {
                req.flash('error', 'An error occurred while creating a new user')
            } else if (feedback[1] == 2) {
                req.flash('warning', 'The user you tried to create already existed')
            }

            res.redirect('/account/manage/add')
        }
    })
}
