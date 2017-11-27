const mongoose = require('mongoose');

const jcChargeSchema = mongoose.Schema({
    parentRecord: String,
    accused: String,
    charge: String,
    plea: Boolean,
    lawsuit: {
        lawsuit: Boolean,
        record: String
    }
}, {timestamps: { createdAt: 'created_at' } })

const jcChargeModel = mongoose.model('jcCharges', jcChargeSchema)

module.exports = jcChargeModel
