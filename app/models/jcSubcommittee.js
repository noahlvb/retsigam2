const mongoose = require('mongoose');

const idsToNamesFunc = require('./functions/idsToNames')

const jcSubcommitteeSchema = mongoose.Schema({
    record: String,
    assigned: Array,
    report: String,
    done: Boolean

}, {timestamps: { createdAt: 'created_at' } })

jcSubcommitteeSchema.post('find', idsToNamesFunc(['assigned']))

const jcSubcommitteeModel = mongoose.model('jcSubcommittees', jcSubcommitteeSchema)

module.exports = jcSubcommitteeModel
