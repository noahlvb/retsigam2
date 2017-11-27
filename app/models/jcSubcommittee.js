const mongoose = require('mongoose');

const jcSubcommitteeSchema = mongoose.Schema({
    assign: Array,
    report: String
    done: Boolean
}, {timestamps: { createdAt: 'created_at' } })

const jcSubcommitteeModel = mongoose.Model('jcSubcommittees', jcSubcommitteeSchema)

module.exports = jcSubcommitteeModel
