const mongoose = require('mongoose')

const jcComplaints = require('./../../models/jcComplaint')
const jcSubcommittees = require('./../../models/jcSubcommittee')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({_id: req.params.id}, function (err, document) {
            if (err) {
                return console.log(err)
            }

            if (document.length == 0) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            if (req.params.action !== 'subcommittee') {
                document[0].accept(req.params.action, function (err, feedback) {
                    if (feedback == 'accepted') {
                        req.flash('info', 'De klacht is in behandeling genomen')
                    } else if (feedback == 'denied') {
                        req.flash('info', 'De klacht wordt niet behandeld')
                    } else if (err == 'noAction') {
                        req.flash('warning', 'Deze actie is niet mogelijk!')
                    }

                    res.redirect('/jc/complaint/' + req.params.id)
                })
            } else if (req.params.action == 'subcommittee') {
                jcSubcommittees.create(document[0], req.query.assigned, function (err) {
                    if (err && err == 'subcommitteeNoPeople') {
                        req.flash('warning', 'Geef op zijn minst een persoon op voor het subcommittee!')
                    } else if (err) {
                        req.flash('error', 'Something went wrong while creating a subcommittee')
                    } else {
                        req.flash('info', 'Het subcommittee is aangemaakt')
                    }

                    res.redirect('/jc/complaint/' + req.params.id)
                })
            }
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
}
