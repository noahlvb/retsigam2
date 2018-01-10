const express = require('express');
const async = require('async');

const auth = require('./../../middlewares/auth')
const namesConverter = require('./../../helpers/namesConverter');
const jcLawsuits = require('./../../models/jcLawsuit')
const jcComplaints = require('./../../models/jcComplaint')
const jcCharges = require('./../../models/jcCharge')

const router = express.Router()

router.get('/', auth.groups(['schoolMeetingVoorzitter']), function (req, res) {
    jcLawsuits.find({}, function (err, document) {
        if (err) {
            return console.log(err);
        }

        res.render('jc/lawsuit/overview', { lawsuits: document })
    })
})

router.post('/create', auth.groups(['jc']), function (req, res) {
    let complaint = JSON.parse(req.body.complaint)

    async.parallel({
        namesExist: function (callback) {
            namesConverter.toID(req.body.prosecutor, function (peopleIDs) {
                if (peopleIDs.length !== 1) {
                    return callback('namesIncorrect')
                }
                callback(null, true)
            })
        },
        recordExists: function (callback) {
            jcComplaints.find({ record: complaint.record }, function (err, document) {
                if (err) {
                    return console.log(err);
                }

                if (document.length !== 1) {
                    return callback('noComplaint')
                }
                callback(null, true)
            })
        },
        charges: function (callback) {
            jcCharges.find({ _id: req.body.charge }, function (err, document) {
                chargesID = []

                if (err) {
                    return console.log(err);
                }

                if (!req.body.charge) {
                    return callback('noCharge')
                }

                if (typeof req.body.charge === 'string' || req.body.charge instanceof String) {
                    req.body.charge = Array(req.body.charge)
                }

                if (document.length !== req.body.charge.length) {
                    return callback('noChargeExist')
                }

                for (charge of document) {
                    chargesID.push(String(charge._id))
                }

                jcLawsuits.find({ charges: { $in: chargesID } }, function (err, documentLawsuits) {
                    if (err) {
                        return console.log(err);
                    }

                    if (documentLawsuits.length > 0) {
                        return callback('chargeAlreadyInLawsuit')
                    }

                    callback(null, document)
                })
            })
        }
    }, function (err, result) {
        if (err == 'namesIncorrect') {
            req.flash('warning', 'Kies een persoon als aanklager')
            return res.redirect('/jc/complaint/' + complaint._id)
        } else if (err == 'noComplaint') {
            req.flash('warning', 'Deze klacht bestaat niet!')
            return res.redirect('/jc/overview')
        } else if (err == 'noChargeExist') {
            req.flash('warning', 'Deze aanklacht bestaat niet!')
            return res.redirect('/jc/complaint/' + complaint._id)
        } else if (err == 'noCharge') {
            req.flash('warning', 'Er is geen aanklacht geselecteerd!')
            return res.redirect('/jc/complaint/' + complaint._id)
        } else if (err == 'chargeAlreadyInLawsuit') {
            req.flash('warning', 'Een van de aanklachten hoort al bij een rechtzaak')
            return res.redirect('/jc/complaint/' + complaint._id)
        }

        let laws = result.charges.map(charge => { return charge.law })
        let sameLaw = laws.every(law => { return law == laws[0] })
        let persons = result.charges.map(charge => { return String(charge.accused.map(user => { return user[0] })) })
        let samePerson = persons.every(person => { return person == persons[0] })

        if (!sameLaw && !samePerson) {
            req.flash('warning', 'Een rechtzaak mag enkel over 1 of meerdere regels/personen gaan maar niet tergelijkertijd!')
            return res.redirect('/jc/complaint/' + complaint._id)
        }
        jcLawsuits.generateRecord(record => {
            let document = {
                record: record,
                jcRecord: complaint.record,
                charges: req.body.charge,
                prosecutor: req.body.prosecutor
            }

            new jcLawsuits(document).save(function (err) {
                req.flash('info', 'Rechtzaak met nummer: ' + document.record + ' aangemaakt!')
                res.redirect('/jc/complaint/' + complaint._id)
            })
        })
    })
})

module.exports = router