const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')
const jcComplaints = require('./../../models/jcComplaint')
const jcSanctions = require('./../../models/jcSanction')
const namesConverter = require('./../../helpers/namesConverter')

const router = express.Router()

router.get('/overview', auth.groups(['jc']), function (req, res) {
    jcSanctions.find({ done: false }, function (err, document) {
        res.render('jc/sanctions', { sanctions: document })
    })
})

router.get('/approve/:id', auth.groups(['jc']), function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcSanctions.find({ _id: req.params.id }, function (err, document) {
            if (err) {
                return console.log(err);
            }

            if (document.length == 0) {
                req.flash('warning', 'Deze sanctie bestaat niet!')
                return res.redirect('/jc/sanction/overview')
            }

            document[0].done = true
            document[0].save(function (err) {
                req.flash('info', 'Sanctie is goedgekeurd')
                res.redirect('/jc/sanction/overview')
            })
        })
    } else {
        req.flash('warning', 'Deze sanctie bestaat niet!')
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

            namesConverter.toID(req.body.offender, function (peopleIDs) {
                if (peopleIDs.length != 1) {
                    req.flash('warning', 'Geef een naam op!')
                    return res.redirect('/jc/complaint/' + req.params.id)
                }

                let document = {
                    record: documentComplaint[0].record,
                    offender: peopleIDs,
                    sanction: req.body.sanction,
                    done: false
                }

                new jcSanctions(document).save(function (err) {
                    req.flash('info', 'Sanctie is aangemaakt')
                    res.redirect('/jc/complaint/' + req.params.id)
                })
            })
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
})

module.exports = router
