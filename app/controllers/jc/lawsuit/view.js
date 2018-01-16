const async = require('async');
const mongoose = require('mongoose');

const jcLawsuits = require('./../../../models/jcLawsuit')
const jcComplaints = require('./../../../models/jcComplaint')
const jcCharges = require('./../../../models/jcCharge')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcLawsuits.find({ _id: req.params.id }, function (err, document) {
            if (err) {
                return console.log(err);
            }

            if (document.length !== 1) {
                req.flash('warning', 'Deze rechtzaak bestaat niet!')
                res.redirect('/jc/lawsuit')
            }

            async.parallel({
                complaint: function (callback) {
                    jcComplaints.find({ record: document[0].jcRecord }, function (err, documentComplaint) {
                        callback(null, documentComplaint[0])
                    })
                },
                charges: function (callback) {
                    jcCharges.find({ record: document[0].jcRecord }, function (err, documentCharges) {
                        callback(null, documentCharges)
                    })
                },
                lawsuits: function (callback) {
                    jcLawsuits.find({ jcRecord: document[0].jcRecord }, function (err, documentLawsuits) {
                        callback(null, documentLawsuits)
                    })
                }
            }, function (err, result) {
                res.render('jc/lawsuit/case', { lawsuit: document[0], lawsuits: result.lawsuits, complaint: result.complaint, charges: result.charges, subcommittee: undefined })
            })
        })
    } else {
        req.flash('warning', 'Deze rechtzaak bestaat niet!')
        return res.redirect('/lawsuit/overview')
    }
}
