const mongoose = require('mongoose');

const namesConverter = require('./../../../helpers/namesConverter');
const jcComplaints = require('./../../../models/jcComplaint')
const jcCharges = require('./../../../models/jcCharge')
const laws = require('./../../../models/law')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({_id: req.params.id}, function (err, documentComplaint) {
            if (err) {
                return console.log(err);
            }

            if (documentComplaint.length == 0) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            for (field in req.body) {
                if (req.body[field] === '' || req.body[field] === null || req.body[field] === undefined) {
                    req.flash('warning', 'Vul alle velden in!')
                    return res.redirect('/jc/complaint/' + req.params.id)
                }
            }

            namesConverter.toID(req.body.accused, function (peopleIDs) {
                if (peopleIDs.length != 1) {
                    req.flash('warning', 'Geef een naam op!')
                    return res.redirect('/jc/complaint/' + req.params.id)
                }

                laws.findOne({ number: req.body.law, enabled: true }, function (err, documentLaw) {
                    if (!documentLaw) {
                        req.flash('warning', 'Deze regel bestaat niet!')
                        return res.redirect('/jc/complaint/' + req.params.id)
                    }

                    let documentCharge = {
                        record: documentComplaint[0].record,
                        accused: [peopleIDs[0]],
                        law: req.body.law,
                        plea: Boolean(Number(req.body.plea))
                    }

                    new jcCharges(documentCharge).save(function (err) {
                        if (err) {
                            req.flash('error', 'Deze aanklacht is al gemaakt')
                        } else {
                            req.flash('info', 'Aanklacht aangemaakt')
                        }

                        res.redirect('/jc/complaint/' + req.params.id)
                    })
                })
            })
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
}
