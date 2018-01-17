const async = require('async');

const namesConverter = require('./../../helpers/namesConverter');
const jcComplaints = require('./../jcComplaint')
const jcCharges = require('./../jcCharge')

module.exports = function(complaint, newLawsuit, callback) {
    async.parallel({
        namesExist: function (callback) {
            namesConverter.toID(newLawsuit.prosecutor, function (peopleIDs) {
                if (peopleIDs.length !== 1) {
                    return callback('namesIncorrect')
                }
                callback(null, true)
            })
        },
        recordExists: function (callback) {
            jcComplaints.find({ record: complaint.record }, function (err, document) {
                if (err) {
                    return console.log(err);
                }

                if (document.length !== 1) {
                    return callback('noComplaint')
                }
                callback(null, true)
            })
        },
        charges: function (callback) {
            jcCharges.find({ _id: newLawsuit.charge }, function (err, document) {
                chargesID = []

                if (err) {
                    return console.log(err);
                }

                if (!newLawsuit.charge) {
                    return callback('noCharge')
                }

                if (typeof newLawsuit.charge === 'string' || newLawsuit.charge instanceof String) {
                    newLawsuit.charge = Array(newLawsuit.charge)
                }

                if (document.length !== newLawsuit.charge.length) {
                    return callback('noChargeExist')
                }

                for (charge of document) {
                    chargesID.push(String(charge._id))
                }

                this.find({ charges: { $in: chargesID } }, function (err, documentLawsuits) {
                    if (err) {
                        return console.log(err);
                    }

                    if (documentLawsuits.length > 0) {
                        return callback('chargeAlreadyInLawsuit')
                    }

                    callback(null, document)
                })
            }.bind(this))
        }.bind(this),
        record: function (callback) {
            let records = []

            this.find({}, function (err, document) {
                for (lawsuit of document) {
                    records.push(parseInt(lawsuit.record.split('-')[1]))
                }

                newRecord = 'R-' + ((Math.max.apply(null, records) == -Infinity) ? 1 : Math.max.apply(null, records) + 1)
                callback(null, newRecord)
            })
        }.bind(this)
    }, function (err, result) {
        if (err) {
            return callback(err)
        }

        let laws = result.charges.map(charge => { return charge.law })
        let sameLaw = laws.every(law => { return law == laws[0] })
        let persons = result.charges.map(charge => { return String(charge.accused.map(user => { return user[0] })) })
        let samePerson = persons.every(person => { return person == persons[0] })

        if (!sameLaw && !samePerson) {
            return callback('wrongCombination')
        }

        let document = {
            record: result.record,
            jcRecord: complaint.record,
            charges: newLawsuit.charge,
            prosecutor: newLawsuit.prosecutor
        }

        new this(document).save(function (err) {
            callback(null, result.record)
        })
    }.bind(this))
}
