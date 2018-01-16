const async = require('async');

const namesConverter = require('./../../helpers/namesConverter');

module.exports = function (user, newComplaint, callback) {
    for (field in newComplaint) {
        if ((newComplaint[field] === '' || newComplaint[field] === null || newComplaint[field] === undefined) && field !== 'witnesses' && field !== 'accused') {
            return callback(2)
        }
    }

    async.parallel({
        record: function(callback) {
            let currentYear = new Date().getFullYear()
            let records = []

            this.find({record: new RegExp('^' + currentYear)}, function (err, document) {
                for (complaint of document) {
                    records.push(parseInt(complaint.record.split('-')[1]))
                }

                newRecord = currentYear + '-' + ((Math.max.apply(null, records) == -Infinity) ? 1 : Math.max.apply(null, records) + 1)
                callback(null, newRecord)
            })
        }.bind(this),
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

        new this(document).save(function (err, document) {
            if (err) {
                callback(1)
            } else {
                callback(0)
            }
        })
    }.bind(this))
}
