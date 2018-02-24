const async = require('async');

const jcSubcommittees = require('./../models/jcSubcommittee')
const jcLawsuits = require('./../models/jcLawsuit')
const jcSanctions = require('./../models/jcSanction')

module.exports = function (req, res) {
    async.parallel({
        subcommittees: function (callback) {
            jcSubcommittees.find({
                $and: [
                    { assigned: { '$in': [req.user._id] } },
                    { done: false }
                ]
            }, function (err, document) {
                callback(null, document)
            })
        },
        lawsuits: function (callback) {
            jcLawsuits.find({
                $and: [
                    { jury: { '$in': [req.user._id] } }
                ]
            }, function (err, document) {
                callback(null, document)
            })
        },
        sanctions: function (callback) {
            jcSanctions.find({
                $and: [
                    { offender: { '$in': [req.user._id] } },
                    { done: false }
                ]
            }, function (err, document) {
                callback(null, document)
            })
        }
    }, function (err, result) {
        res.render('home', { jcSubcommittees: result.subcommittees, lawsuits: result.lawsuits, sanctions: result.sanctions })
    })
}
