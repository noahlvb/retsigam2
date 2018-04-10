const mongoose = require('mongoose')

const idsToNamesFunc = require('./../functions/idsToNames')

const jcComplaintSchema = mongoose.Schema({
    // Data from originator
    record: String,
    originator: Array,
    complaintDateTime: Date,
    complaintLocation: String,
    accused: Array,
    witnesses: Array,
    happend: String,

    notes: String,

    accepted: Boolean,
    report: String,
    reportAccepted: Boolean,
    reportAcceptedDate: Date,
    proceeding: Boolean
}, {timestamps: { createdAt: 'created_at' } })

jcComplaintSchema.index({ record: 1 }, { unique: true })

jcComplaintSchema.statics.apply = require('./new')
jcComplaintSchema.methods.notesSave = require('./notes')
jcComplaintSchema.methods.accept = require('./accept')
jcComplaintSchema.methods.reportSaveAccept = require('./report')
jcComplaintSchema.methods.sendToSM = require('./sendToSM')

jcComplaintSchema.post('find', idsToNamesFunc(['accused', 'originator', 'witnesses']))

const jcComplaintModel = mongoose.model('jcComplaints', jcComplaintSchema)

module.exports = jcComplaintModel
