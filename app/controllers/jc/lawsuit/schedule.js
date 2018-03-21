const mongoose = require('mongoose')

const jcLawsuits = require('./../../../models/jcLawsuit')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcLawsuits.find({ _id: req.params.id }, function (err, document) {
            if (document.length !== 1) {
                req.flash('warning', 'Deze rechtzaak bestaat niet!')
                return res.redirect('/jc/lawsuit')
            }

            document[0].schedule(req.body, function (err) {
                if (err && err == 'pastDatetime') {
                    req.flash('warning', 'Je kan een rechtzaak niet in het verleden plannen!')
                    return res.redirect('/jc/lawsuit/' + req.params.id)
                } else if (err && err == 'noNames') {
                    req.flash('warning', 'Je moet op zijn minst 1 jury lid toewijzen')
                    return res.redirect('/jc/lawsuit/' + req.params.id)
                }

                req.flash('info', 'Rechtzaak is ingepland')
                res.redirect('/jc/lawsuit')
            })
        })
    } else {
        req.flash('warning', 'Deze rechtzaak bestaat niet!')
        return res.redirect('/lawsuit/overview')
    }
}
