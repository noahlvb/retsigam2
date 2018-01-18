const mongoose = require('mongoose');

const idsToNamesFunc = require('./../functions/idsToNames')

const jcSanctionSchema = mongoose.Schema({
    record: String,
    offender: Array,
    sanction: String,
    done: Boolean

}, {timestamps: { createdAt: 'created_at' } })

jcSanctionSchema.index({ record: 1, offender: 1 }, { unique: true })

jcSanctionSchema.statics.new = require('./new')

jcSanctionSchema.post('find', idsToNamesFunc(['offender']))

const jcChargeModel = mongoose.model('jcSanctions', jcSanctionSchema)

module.exports = jcChargeModel
