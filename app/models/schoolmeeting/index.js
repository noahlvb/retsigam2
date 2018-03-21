const mongoose = require('mongoose')

const schoolmeetingSchema = mongoose.Schema({
    datetime: Date,
    location: String,
    type: String,

    jcComplaints: Array
}, {timestamps: { createdAt: 'created_at' } })

schoolmeetingSchema.index({ datetime: 1 }, { unique: true })

schoolmeetingSchema.statics.approveComplaint = require('./approveComplaint')

const schoolmeetingModel = mongoose.model('schoolmeeting', schoolmeetingSchema)

module.exports = schoolmeetingModel
