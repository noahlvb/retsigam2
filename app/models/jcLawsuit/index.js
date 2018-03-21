const mongoose = require('mongoose')

const idsToNamesFunc = require('./../functions/idsToNames')

const jcLawsuitSchema = mongoose.Schema({
    record: String,
    jcRecord: String,
    jcMembers: Array,
    prosecutor: String,
    charges: Array,
    date: Date,
    jury: Array,
    done: Boolean

}, {timestamps: { createdAt: 'created_at' } })

jcLawsuitSchema.index({ record: 1 }, { unique: true })

jcLawsuitSchema.statics.new = require('./new')
jcLawsuitSchema.methods.schedule = require('./schedule')
jcLawsuitSchema.methods.close = require('./close')

jcLawsuitSchema.post('find', idsToNamesFunc(['jury', 'jcMembers']))

const jcLawsuitModel = mongoose.model('jcLawsuit', jcLawsuitSchema)

module.exports = jcLawsuitModel
