const users = require('./../../../models/users')

module.exports = function (req, res) {
    users.find({ _id: req.params.id }, function (err, document) {
        if (err) {
            return console.log(err)
        }

        document[0].changeEmail(req.body.email, req.body.emailConfirm, function (err) {
            if (err == 'notSame') {
                req.flash('warning', 'De email adressen zijn niet gelijk!')
            } else if (err == 'invalid') {
                req.flash('warning', 'Dit is geen geldig mail adres')
            } else {
                req.flash('info', 'Email adres succesvol gewijzigd')
            }

            res.redirect('/account/manage/' + req.params.id)
        })
    })
}
