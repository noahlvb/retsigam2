const users = require('./../../models/users')

module.exports = function (req, res) {

    for (var key in req.body) {
        if (req.body[key].length <= 0) {
            req.flash('warning', res.__('ACCOUNTADD_flashFillFields'))
            return res.redirect('/account/manage/add')
        }
    }

    users.add(req.body, function (feedback, username) {
        if (feedback[0] === true) {
            req.flash('info', res.__('ACCOUNTADD_flashSucces') + username)
            res.redirect('/account/manage')
        } else {
            if (feedback[1] == 1) {
                req.flash('error', res.__('ACCOUNTADD_flashError'))
            } else if (feedback[1] == 2) {
                req.flash('warning', res.__('ACCOUNTADD_flashExisting'))
            }

            res.redirect('/account/manage/add')
        }
    })
}
