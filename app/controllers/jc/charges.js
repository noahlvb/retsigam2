const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')
const jcComplaints = require('./../../models/jcComplaint')

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

module.exports = router
