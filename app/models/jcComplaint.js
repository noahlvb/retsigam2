const mongoose = require('mongoose')

const jcComplaintSchema = mongoose.Schema({
    // Data from originator
    record: String,
    originator: Array,
    complaintDateTime: Date,
    complaintLocation: String,
    accused: Array,
    witnesses: Array,
    happend: String,

    // JC handeling portion
    handle: {
        handle: Number, // -2: Trashed, -1: Not yet decided, 0: being handled
        subcommitteeRecord: String,
    },
    report: String,
    reportDate: Date,
    action: {
        action: Number, // -2: end, -1: Not yet decided, 0: Proceed, 1: ombudsmans
        ombudsmansRecord: String
    }
    schoolMeeting: {
        sendin: Boolean,
        sendinDate: Date,
        passed: Boolean
    }
}, {timestamps: { createdAt: 'created_at' } })

const jcComplaintModel = mongoose.model('jcComplaints', jcComplaintSchema)

module.exports = jcComplaintModel
