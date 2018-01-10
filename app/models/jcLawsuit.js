const mongoose = require('mongoose');

const idsToNamesFunc = require('./functions/idsToNames')

const jcLawsuitSchema = mongoose.Schema({
    record: String,
    jcRecord: String,
    prosecutor: String,
    charges: Array,
    date: Date,
    jury: Array

}, {timestamps: { createdAt: 'created_at' } })

jcLawsuitSchema.index({ record: 1 }, { unique: true })

jcLawsuitSchema.post('find', idsToNamesFunc(['jury']))

const jcLawsuitModel = mongoose.model('jcLawsuit', jcLawsuitSchema)

module.exports = jcLawsuitModel

module.exports.generateRecord = (callback) => {
    let records = []

    jcLawsuitModel.find({}, function (err, document) {
        for (lawsuit of document) {
            records.push(parseInt(lawsuit.record.split('-')[1]))
        }

        newRecord = 'R-' + ((Math.max.apply(null, records) == -Infinity) ? 1 : Math.max.apply(null, records) + 1)
        callback(newRecord)
    })
}
