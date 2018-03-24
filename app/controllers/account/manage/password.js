const users = require('./../../../models/users')

module.exports = function (req, res) {
    users.find({ _id: req.params.id }, function (err, document) {
        if (err) {
            return console.log(err)
        }

        document[0].changePassword(req.body.password, req.body.passwordConfirm, function (err) {
            if (err == 'notSame') {
                req.flash('warning', 'De wachtwoorden zijn niet gelijk!')
            } else {
                req.flash('info', 'Wachtwoord succesvol gewijzigd')
            }

            res.redirect('/account/manage/' + req.params.id)
        })
    })
}
