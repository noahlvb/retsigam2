const mongoose = require('mongoose');

const laws = require('./../../models/law')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        laws.findOne({ _id: req.params.id }, function (err, document) {
            if (!document) {
                req.flash('warning', 'Deze regel bestaat niet!')
                return res.redirect('/law')
            }
            
            document.edit(req.body.content, function (err) {
                if (err && err == 'notAllFields') {
                    req.flash('warning', 'Niet alle velden zijn ingevuld!')
                    return res.redirect('/law')
                } else if (err && err == 'lawDisabled') {
                    req.flash('error', 'Deze regel is uitgeschakeld')
                    return res.redirect('/law')
                }

                req.flash('info', 'Regel succesvol bijgewerkt')
                res.redirect('/law')
            })
        })
    } else {
        req.flash('warning', 'Deze regel bestaat niet!')
        return res.redirect('/law')
    }
}
