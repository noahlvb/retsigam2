const namesConverter = require('./../../helpers/namesConverter');

module.exports = function (complaint, assigned, callback) {
    namesConverter.toID(assigned, function (peopleIDs) {
        if (peopleIDs.length < 1) {
            callback('subcommitteeNoPeople')
        } else {
            let document = {
                complaint: complaint.record,
                assigned: peopleIDs,
                report: '',
                done: false
            }

            new this(document).save(function (err) {
                if (err) {
                    callback('error')
                } else {
                    callback(null)
                }
            })
        }
    }.bind(this))
}
