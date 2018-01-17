const mongoose = require('mongoose');

const laws = require('./../../models/law')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        laws.findOne({ _id: req.params.id }, function (err, document) {
            if (document.enabled) {
                document.enabled = false
                document.save(function (err) {
                    req.flash('info', 'Regel succesvol uitgeschakeld')
                    res.redirect('/law')
                })
            } else {
                req.flash('error', 'Deze regel is uitgeschakeld')
                res.redirect('/law')
            }
        })

    } else {
        req.flash('warning', 'Deze regel bestaat niet!')
        return res.redirect('/law')
    }
}
