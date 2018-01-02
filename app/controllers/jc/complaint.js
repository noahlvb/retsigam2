const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')
const jcComplaints = require('./../../models/jcComplaint')
const jcSubcommittee = require('./../../models/jcSubcommittee')

const router = express.Router()

router.get('/:id', auth.groups(['jc']), function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({_id: req.params.id}, function (err, documentComplaint) {
            if (err) {
                return console.log(err);
            }

            if (documentComplaint.length == 0) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            jcSubcommittee.find({ complaint: documentComplaint[0].record }, function (err, documentSubcommittee) {
                res.render('jc/complaint', {complaint: documentComplaint[0], subcommittee: documentSubcommittee[0]})
            })
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
})

module.exports = router
