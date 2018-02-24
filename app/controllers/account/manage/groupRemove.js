const users = require('./../../../models/users')

module.exports = function (req, res) {
    users.findOne({ _id: req.params.id}, function (err, document) {
        if (err) {
            return console.log(err)
        }

        document.group('remove', req.query.group, function (status) {
            if (status === 0) {
                req.flash('info', 'Group succesfully removed')
            } else if (status === 2) {
                req.flash('warning', 'Group does not exists')
            }
            res.redirect('/account/manage/' + req.params.id)
        })
    })
}
