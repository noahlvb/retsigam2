const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')
const jcComplaints = require('./../../models/jcComplaint')

const router = express.Router()

router.get('/:id', auth.groups(['jc']), function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({_id: req.params.id}, function (err, document) {
            if (err) {
                return console.log(err);
            }

            if (!document) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            res.render('jc/complaint', {complaint: document[0], subcommittee: 'fsdf'})
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
})

module.exports = router
