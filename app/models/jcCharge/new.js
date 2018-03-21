const namesConverter = require('./../../helpers/namesConverter')
const jcComplaints = require('./../jcComplaint')
const laws = require('./../law')

module.exports = function (id, newCharge, callback) {
    jcComplaints.find({_id: id}, function (err, documentComplaint) {
        if (err) {
            return console.log(err)
        }

        if (documentComplaint.length == 0) {
            return callback('complaintNoExist')
        }

        for (field in newCharge) {
            if (newCharge[field] === '' || newCharge[field] === null || newCharge[field] === undefined) {
                return callback('notAllFields')
            }
        }

        namesConverter.toID(newCharge.accused, function (peopleIDs) {
            if (peopleIDs.length != 1) {
                return callback('noNames')
            }

            laws.findOne({ number: newCharge.law, enabled: true }, function (err, documentLaw) {
                if (!documentLaw) {
                    return callback('LawNoExist')
                }

                let documentCharge = {
                    record: documentComplaint[0].record,
                    accused: [peopleIDs[0]],
                    law: newCharge.law,
                    plea: Boolean(Number(newCharge.plea))
                }

                new this(documentCharge).save(function (err) {
                    if (err) {
                        return callback('chargeAlreadyExists')
                    }

                    callback(null)
                })
            }.bind(this))
        }.bind(this))
    }.bind(this))
}
