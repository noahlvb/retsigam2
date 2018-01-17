const mongoose = require('mongoose');

const lawSchema = mongoose.Schema({
    number: Number,
    content: String,
    enabled: Boolean
}, {timestamps: { createdAt: 'created_at' } })

lawSchema.index({ number: 1 }, { unique: true })

lawSchema.statics.new = require('./new')
lawSchema.methods.edit = require('./edit')
lawSchema.methods.disable = require('./disable')

const lawModel = mongoose.model('laws', lawSchema)

module.exports = lawModel
