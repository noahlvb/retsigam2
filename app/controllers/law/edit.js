const mongoose = require('mongoose');

const laws = require('./../../models/law')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        if (req.body.content === '' || req.body.content === null || req.body.content === undefined) {
            req.flash('warning', 'Niet alle velden zijn ingevuld!')
            return res.redirect('/law')
        }

        laws.findOne({ _id: req.params.id }, function (err, document) {
            if (document.enabled) {
                document.content = req.body.content
                document.save(function (err) {
                    req.flash('info', 'Regel succesvol bijgewerkt')
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
