const mongoose = require('mongoose');

const idsToNamesFunc = require('./functions/idsToNames')

const jcChargeSchema = mongoose.Schema({
    record: String,
    accused: Array,
    law: String,
    plea: Boolean,
    pleaCase: Boolean

}, {timestamps: { createdAt: 'created_at' } })

jcChargeSchema.index({ record: 1, accused: 1, law: 1 }, { unique: true })

jcChargeSchema.post('find', idsToNamesFunc(['accused']))

const jcChargeModel = mongoose.model('jcCharges', jcChargeSchema)

module.exports = jcChargeModel
