const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')
const jcComplaints = require('./../../models/jcComplaint')

const router = express.Router()

router.get('/:id/:action', auth.groups(['jc']), function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({_id: req.params.id}, function (err, document) {
            if (err) {
                return console.log(err);
            }

            if (document.length == 0) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            document[0].accept(req.params.action, req.query.subnames, function (err, feedback) {
                if (feedback == 'accepted') {
                    req.flash('info', 'De klacht is in behandeling genomen')
                } else if (feedback == 'denied') {
                    req.flash('info', 'De klacht wordt niet behandeld')
                } else if (feedback == 'subcommitteeOK') {
                    req.flash('info', 'Het subcommittee is aangemaakt')
                } else if (err == 'subcommitteeNoPeople') {
                    req.flash('warning', 'Geef op zijn minst een persoon op voor het subcommittee!')
                } else if (err == 'noAction') {
                    req.flash('warning', 'Deze actie is niet mogelijk!')
                }

                res.redirect('/jc/complaint/' + req.params.id)
            })
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
})

module.exports = router
