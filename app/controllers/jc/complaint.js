const express = require('express');
const mongoose = require('mongoose');
const async = require('async');

const auth = require('./../../middlewares/auth')
const jcComplaints = require('./../../models/jcComplaint')
const jcSubcommittee = require('./../../models/jcSubcommittee')
const jcCharges = require('./../../models/jcCharge')
const jcLawsuits = require('./../../models/jcLawsuit')
const jcSanctions = require('./../../models/jcSanction')

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

            async.parallel({
                subcommittee: function (callback) {
                    jcSubcommittee.find({ complaint: documentComplaint[0].record }, function (err, document) {
                        callback(null, document[0])
                    })
                },
                charges: function (callback) {
                    jcCharges.find({ record: documentComplaint[0].record }, function (err, document) {
                        callback(null, document)
                    })
                },
                lawsuits: function (callback) {
                    jcLawsuits.find({ jcRecord: documentComplaint[0].record }, function (err, document) {
                        callback(null, document)
                    })
                },
                sanctions: function (callback) {
                    jcSanctions.find({ record: documentComplaint[0].record }, function (err, document) {
                        callback(null, document)
                    })
                }
            }, function (err, result) {
                res.render('jc/complaint', {
                    complaint: documentComplaint[0],
                    subcommittee: result.subcommittee,
                    charges: result.charges,
                    lawsuits: result.lawsuits,
                    sanctions: result.sanctions
                })
            })
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
})

module.exports = router
