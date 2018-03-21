const jcComplaints = require('./../jcComplaint')
const namesConverter = require('./../../helpers/namesConverter')

module.exports = function (id, newSanction, callback) {
    jcComplaints.find({_id: id}, function (err, documentComplaint) {
        if (err) {
            return console.log(err)
        }

        if (documentComplaint.length == 0) {
            return callback('complaintNoExist')
        }

        for (field in newSanction) {
            if (newSanction[field] === '' || newSanction[field] === null || newSanction[field] === undefined) {
                return callback('notAllFields')
            }
        }

        namesConverter.toID(newSanction.offender, function (peopleIDs) {
            if (peopleIDs.length != 1) {
                return callback('noNames')
            }

            let document = {
                record: documentComplaint[0].record,
                offender: peopleIDs,
                sanction: newSanction.sanction,
                done: false
            }

            new this(document).save(function (err) {
                if (err) {
                    return callback('dubbleSanction')
                }

                callback(null)
            })
        }.bind(this))
    }.bind(this))
}
