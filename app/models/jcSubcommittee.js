const mongoose = require('mongoose');

const namesConverter = require('./../helpers/namesConverter');
const idsToNamesFunc = require('./functions/idsToNames')

const jcSubcommitteeSchema = mongoose.Schema({
    complaint: String,
    assigned: Array,
    report: String,
    done: Boolean

}, {timestamps: { createdAt: 'created_at' } })

jcSubcommitteeSchema.index({ complaint: 1 }, { unique: true })

jcSubcommitteeSchema.post('find', idsToNamesFunc(['assigned']))

const jcSubcommitteeModel = mongoose.model('jcSubcommittees', jcSubcommitteeSchema)

module.exports = jcSubcommitteeModel

module.exports.create = function (complaint, assigned, callback) {
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

            new jcSubcommitteeModel(document).save(function (err) {
                if (err) {
                    callback('error')
                } else {
                    callback(null)
                }
            })
        }
    })
}
