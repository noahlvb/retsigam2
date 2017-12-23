const mongoose = require('mongoose')
const async = require('async');

const jcSubcommittees = require('./jcSubcommittee')

const namesConverter = require('./../helpers/namesConverter');
const idsToNamesFunc = require('./functions/idsToNames')


const jcComplaintSchema = mongoose.Schema({
    // Data from originator
    record: String,
    originator: Array,
    complaintDateTime: Date,
    complaintLocation: String,
    accused: Array,
    witnesses: Array,
    happend: String,

    accepted: Boolean,
    report: String

}, {timestamps: { createdAt: 'created_at' } })

jcComplaintSchema.methods.accept = function (action, subnames, callback) {
    if (!this.accepted && action == 'accept') {
        this.accepted = true
        this.save()
        callback(null, 'accepted')
    } else if (!this.accepted && action == 'deny') {
        this.accepted = false
        this.save()
        callback(null, 'denied')
    } else if (action == 'subcommittee') {
        jcSubcommittees.create(this.id, subnames, function (err) {
            if (err) {
                callback('subcommitteeNoPeople')
            } else {
                callback(null, 'subcommitteeOK')
            }
        })
    } else {
        callback('noAction')
    }
}

jcComplaintSchema.post('find', idsToNamesFunc(['accused', 'originator', 'witnesses']))

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

    for (field in newComplaint) {
        if ((newComplaint[field] === '' || newComplaint[field] === null || newComplaint[field] === undefined) && field !== 'witnesses' && field !== 'accused') {
            return callback(2)
        }
    }

    async.parallel({
        record: function(callback) {
            module.exports.generateRecord(function (record) {
                callback(null, record)
            })
        },
        accused: function(callback) {
            namesConverter.toID(newComplaint.accused, function (peopleIDs) {
                callback(null, peopleIDs)
            })
        },
        witnesses: function(callback) {
            namesConverter.toID(newComplaint.witnesses, function (peopleIDs) {
                callback(null, peopleIDs)
            })
        }
    }, function(err, results) {
        let document = {
            record: results['record'],
            originator: user._id,
            complaintDateTime: new Date(newComplaint.datetime),
            complaintLocation: newComplaint.location,
            accused: results['accused'],
            witnesses: results['witnesses'],
            happend: newComplaint.happend
        }

        new jcComplaintModel(document).save(function (err, document) {
            if (err) {
                callback(1)
            } else {
                callback(0)
            }
        })
    });
}
