const mongoose = require('mongoose')

const getNames = require('./../helpers/getNames');

const jcComplaintSchema = mongoose.Schema({
    // Data from originator
    record: String,
    originator: Array,
    complaintDateTime: Date,
    complaintLocation: String,
    accused: Array,
    witnesses: Array,
    happend: String,

    // JC handeling portion
    handle: {
        handle: Number, // -2: Trashed, -1: Not yet decided, 0: being handled
        subcommitteeRecord: String,
    },
    report: String,
    reportDate: Date,
    action: {
        action: Number, // -2: end, -1: Not yet decided, 0: Proceed, 1: ombudsmans
        ombudsmansRecord: String
    },
    schoolMeeting: {
        sendin: Boolean,
        sendinDate: Date,
        passed: Boolean
    }
}, {timestamps: { createdAt: 'created_at' } })

const jcComplaintModel = mongoose.model('jcComplaints', jcComplaintSchema)

module.exports = jcComplaintModel

module.exports.generateRecord = (callback) => {
    let currentYear = new Date().getFullYear()
    let records = []

    jcComplaintModel.find({record: new RegExp('^' + currentYear)}, function (err, document) {
        for (complaint of document) {
            records.push(parseInt(complaint.record.split('-')[1]))
        }

        newRecord = currentYear + '-' + ((Math.max.apply(null, records) == -Infinity) ? 1 : Math.max.apply(null, records) + 1)
        callback(newRecord)
    })
}

module.exports.apply = function (user, newComplaint, callback) {
    module.exports.generateRecord(function (record) {
        let document = {
            record: record,
            originator: user.username,
            complaintDateTime: new Date(newComplaint.datetime),
            complaintLocation: newComplaint.location,
            accused: getNames(newComplaint.accused),
            witnesses: getNames(newComplaint.witnesses),
            happend: newComplaint.happend
        }

        new jcComplaintModel(document).save(function (err, document) {
            if (err) {
                callback(1)
            } else {
                callback(0)
            }
        })
    })
}
