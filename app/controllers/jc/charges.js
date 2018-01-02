const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')
const namesConverter = require('./../../helpers/namesConverter');
const jcComplaints = require('./../../models/jcComplaint')
const jcCharges = require('./../../models/jcCharge')
const laws = require('./../../models/law')

const router = express.Router()

router.get('/proceeding/:id/:action', auth.groups(['jc']), function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({_id: req.params.id}, function (err, document) {
            if (err) {
                return console.log(err);
            }

            if (document.length == 0) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            if (req.params.action == 'accept') {
                document[0].proceeding = true
                req.flash('info', 'Klacht wordt ingediend')
            } else if (req.params.action == 'deny') {
                document[0].proceeding = false
                req.flash('info', 'Er wordt geen klacht ingediend')
            } else {
                req.flash('warning', 'Deze actie is niet mogelijk')
            }

            document[0].save(function (err) {
                res.redirect('/jc/complaint/' + req.params.id)
            })

        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
})

router.post('/:id', auth.groups(['jc']), function (req, res) {
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
                        record: documentComplaint.record,
                        accused: [peopleIDs[0]],
                        law: req.body.law,
                        plea: Boolean(req.body.plea)
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
})

module.exports = router
