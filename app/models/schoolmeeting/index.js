const mongoose = require('mongoose');

const schoolmeetingSchema = mongoose.Schema({
    datetime: Date,
    location: String,
    type: String
}, {timestamps: { createdAt: 'created_at' } })

schoolmeetingSchema.index({ datetime: 1 }, { unique: true })

const schoolmeetingModel = mongoose.model('schoolmeeting', schoolmeetingSchema)

module.exports = schoolmeetingModel
