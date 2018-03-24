const users = require('./../../../models/users')

module.exports = function (req, res) {
    users.findOne({ _id: req.params.id }, function (err, document) {
        if (err) {
            return console.log(err)
        }

        res.render('accountManageIndiv', { userProfile: document})
    })
}
