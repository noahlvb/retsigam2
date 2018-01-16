const mongoose = require('mongoose');

const jcLawsuits = require('./../../../models/jcLawsuit')
const jcComplaints = require('./../../../models/jcComplaint')
const jcCharges = require('./../../../models/jcCharge')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcLawsuits.find({ _id: req.params.id }, function (err, document) {
            if (document.length !== 1) {
                req.flash('warning', 'Deze rechtzaak bestaat niet!')
                res.redirect('/jc/lawsuit')
            }

            let lawsuitOutcome = []
            let chargesID = []

            for (object in req.body) {
                if (object.slice(':', 8) == 'pleaCase') {
                    lawsuitOutcome[object.slice(9)] = req.body[object]
                    chargesID.push(object.slice(9))
                }
            }

            jcCharges.find({ _id: { $in: chargesID } }, function (err, documentCharges) {
                for (charge of documentCharges) {
                    charge.pleaCase = Boolean(Number(lawsuitOutcome[charge._id]))
                    charge.save()
                }
            })

            jcComplaints.find({ record: document[0].jcRecord }, function (err, documentComplaint) {
                documentComplaint[0].report = req.body.report
                documentComplaint[0].save()
            })

            document[0].done = true
            document[0].save(function (err) {
                req.flash('info', 'Rechtzaak succesvol afgerond')
                res.redirect('/jc/lawsuit/')
            })
        })
    } else {
        req.flash('warning', 'Deze rechtzaak bestaat niet!')
        return res.redirect('/lawsuit/overview')
    }
}
