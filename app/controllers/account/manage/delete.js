const users = require('./../../../models/users')

module.exports = function (req, res) {
    users.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Er is iets mis gegaan')
        } else {
            req.flash('info', 'Account is verwijderd')
        }

        res.redirect('/account/manage')
    })
}
