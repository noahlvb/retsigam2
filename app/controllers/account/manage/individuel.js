const users = require('./../../../models/users')

module.exports = function (req, res) {
    if (!(req.user.groups.indexOf('admin') !== -1 || req.user._id == req.params.id)) {
        req.flash('warning', 'Toegang geweigerd')
        return res.redirect('/')
    }

    users.findOne({ _id: req.params.id }, function (err, document) {
        if (err) {
            return console.log(err)
        }

        res.render('accountManageIndiv', { userProfile: document})
    })
}
