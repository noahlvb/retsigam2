const mongoose = require('mongoose');

const idsToNamesFunc = require('./../functions/idsToNames')

const jcSubcommitteeSchema = mongoose.Schema({
    complaint: String,
    assigned: Array,
    report: String,
    done: Boolean

}, {timestamps: { createdAt: 'created_at' } })

jcSubcommitteeSchema.index({ complaint: 1 }, { unique: true })

jcSubcommitteeSchema.statics.create = require('./new')
jcSubcommitteeSchema.methods.reportSaveAccept = require('./report')

jcSubcommitteeSchema.post('find', idsToNamesFunc(['assigned']))

const jcSubcommitteeModel = mongoose.model('jcSubcommittees', jcSubcommitteeSchema)

module.exports = jcSubcommitteeModel
