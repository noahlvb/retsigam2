const mongoose = require('mongoose');

const namesConverter = require('./../../../helpers/namesConverter');
const jcLawsuits = require('./../../../models/jcLawsuit')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcLawsuits.find({ _id: req.params.id }, function (err, document) {
            if (document.length !== 1) {
                req.flash('warning', 'Deze rechtzaak bestaat niet!')
                return res.redirect('/jc/lawsuit')
            }

            if (new Date(req.body.datetime).getTime() < new Date().getTime()) {
                req.flash('warning', 'Je kan een rechtzaak niet in het verleden plannen!')
                return res.redirect('/jc/lawsuit/' + req.params.id)
            }

            namesConverter.toID(req.body.jury, function (peopleIDs) {
                document[0].date = new Date(req.body.datetime)
                document[0].jury = peopleIDs

                document[0].save(function (err) {
                    req.flash('info', 'Rechtzaak is ingepland')
                    res.redirect('/jc/lawsuit')
                })
            })
        })
    } else {
        req.flash('warning', 'Deze rechtzaak bestaat niet!')
        return res.redirect('/lawsuit/overview')
    }
}
