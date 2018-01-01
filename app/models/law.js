const mongoose = require('mongoose');

const lawSchema = mongoose.Schema({
    number: Number,
    content: String
}, {timestamps: { createdAt: 'created_at' } })

lawSchema.index({ number: 1 }, { unique: true })

const lawModel = mongoose.model('laws', lawSchema)

module.exports = lawModel