const async = require('async')
const mongoose = require('mongoose')

const jclawsuits = require('./../models/jcLawsuit')
const jcSubcommittees = require('./../models/jcSubcommittee')

module.exports = function (complaint, callback) {
    let stadium

    async.parallel({
        subcommittee: function (callback) {
            jcSubcommittees.find({ complaint: complaint.record }, function (err, documentSubcommittees) {
                if (documentSubcommittees.length == 1) {
                    callback(null, documentSubcommittees[0])
                } else {
                    callback(null, false)
                }
            })
        },
        lawsuits: function (callback) {
            jclawsuits.find({ jcRecord: complaint.record }, function (err, documentLawsuits) {
                if (documentLawsuits.length > 0) {
                    callback(null, true)
                } else {
                    callback(null, false)
                }
            })
        }
    }, function (err, result) {
        if (result.lawsuits) {
            stadium = 'lawsuit'
        } else if (complaint.proceeding) {
            stadium = 'proceeding'
        } else if (result.subcommittee && !result.subcommittee.done) {
            stadium = 'subcommitteeWorking'
        } else if (complaint.accepted) {
            stadium = 'accepted'
        }

        callback(stadium)
    })
}
