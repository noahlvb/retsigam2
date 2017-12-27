const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')

const jcComplaints = require('./../../models/jcComplaint')

const router = express.Router()

router.post('/:id', auth.groups(['jc']), function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({ _id: req.params.id }, function (err, documentComplaint) {
            if (documentComplaint.length == 0) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            documentComplaint[0].report = req.body.report

            if (req.body.saveApply == 'opslaan') {
                documentComplaint[0].save(function (err) {
                    req.flash('info', 'Het JC raport is opgeslagen')
                    return res.redirect('/jc/complaint/' + req.params.id)
                })
            } else if (req.body.saveApply == 'aannemen') {
                documentComplaint[0].reportAccepted = true
                documentComplaint[0].save(function (err) {
                    req.flash('info', 'Het JC raport is aangenomen')
                    return res.redirect('/jc/complaint/' + req.params.id)
                })
            }
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
})

module.exports = router
