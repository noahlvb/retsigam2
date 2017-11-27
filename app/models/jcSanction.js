const mongoose = require('mongoose');

const jcSanctionSchema = mongoose.Schema({
    ChargeRecords: Array,
    sanction: String,
    appeal: Boolean
}, {timestamps: { createdAt: 'created_at' } })

const jcSanctionModel = mongoose.model('jcSanctions', jcSanctionSchema)

module.exports = jcSanctionModel
