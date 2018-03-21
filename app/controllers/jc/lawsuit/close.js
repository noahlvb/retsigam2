const mongoose = require('mongoose')

const jcLawsuits = require('./../../../models/jcLawsuit')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcLawsuits.find({ _id: req.params.id }, function (err, document) {
            if (document.length !== 1) {
                req.flash('warning', 'Deze rechtzaak bestaat niet!')
                res.redirect('/jc/lawsuit')
            }

            document[0].close(req.body, function (err) {
                req.flash('info', 'Rechtzaak succesvol afgerond')
                res.redirect('/jc/lawsuit/')
            })
        })
    } else {
        req.flash('warning', 'Deze rechtzaak bestaat niet!')
        return res.redirect('/lawsuit/overview')
    }
}
