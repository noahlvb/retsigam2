const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')

const jcSubcommittees = require('./../../models/jcSubcommittee')
const jcComplaints = require('./../../models/jcComplaint')

const router = express.Router()

const isAssigned = function (assigned, req) {
    for (user of assigned) {
        if (String(user[0]) == String(req.user._id)) {
            return true
        }
    }

    return false
}

router.get('/:id', auth.auth, function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcSubcommittees.find({_id: req.params.id}, function (err, documentSubcommittee) {
            if (isAssigned(documentSubcommittee[0]['assigned'], req)) {
                jcComplaints.find({record: documentSubcommittee[0].complaint}, function (err, documentComplaint) {
                    res.render('jc/subcommittee', {subcommittee: documentSubcommittee[0], complaint: documentComplaint[0]})
                })
            } else {
                req.flash('warning', 'Je bent niet toegewezen aan dit subcommittee')
                return res.redirect('/')
            }
        })
    } else {
        req.flash('warning', 'Dit subcommittee bestaat niet!')
        return res.redirect('/')
    }
})

router.post('/:id', auth.auth, function (req, res) {

})

module.exports = router
