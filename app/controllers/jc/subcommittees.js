const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')

const jcSubcommittees = require('./../../models/jcSubcommittee')
const jcComplaints = require('./../../models/jcComplaint')

const router = express.Router()

router.get('/:id', auth.auth, function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcSubcommittees.find({
            $and: [
                { assigned: { '$in': [req.user._id] } },
                { _id: req.params.id },
                { done: false }
            ]
        }, function (err, documentSubcommittee) {
            if (documentSubcommittee.length == 0) {
                req.flash('warning', 'Deze pagina is niet voor jouw bestemd')
                return res.redirect('/')
            }

            jcComplaints.find({record: documentSubcommittee[0].complaint}, function (err, documentComplaint) {
                res.render('jc/subcommittee', {subcommittee: documentSubcommittee[0], complaint: documentComplaint[0]})
            })
        })
    } else {
        req.flash('warning', 'Dit subcommittee bestaat niet!')
        return res.redirect('/')
    }
})

router.post('/:id', auth.auth, function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcSubcommittees.find({
            $and: [
                { assigned: { '$in': [req.user._id] } },
                { _id: req.params.id },
                { done: false }
            ]
        }, function (err, documentSubcommittee) {
            if (documentSubcommittee.length == 0) {
                req.flash('warning', 'Deze pagina is niet voor jouw bestemd')
                return res.redirect('/')
            }

            documentSubcommittee[0].report = req.body.investigation

            if (req.body.saveApply == 'opslaan') {
                documentSubcommittee[0].save(function (err) {
                    req.flash('info', 'Het subcommittee onderzoek is opgeslagen')
                    return res.redirect('/jc/subcommittees/' + req.params.id)
                })
            } else if (req.body.saveApply == 'inleveren') {
                documentSubcommittee[0].done = true
                documentSubcommittee[0].save(function (err) {
                    req.flash('info', 'Het subcommittee onderzoek is afgerond')
                    return res.redirect('/')
                })
            }
        })
    } else {
        req.flash('warning', 'Dit subcommittee bestaat niet!')
        return res.redirect('/')
    }
})

module.exports = router
