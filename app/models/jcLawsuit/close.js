const jcComplaints = require('./../jcComplaint')
const jcCharges = require('./../jcCharge')

module.exports = function (closing, callback) {
    let lawsuitOutcome = []
    let chargesID = []

    for (object in closing) {
        if (object.slice(':', 8) == 'pleaCase') {
            lawsuitOutcome[object.slice(9)] = closing[object]
            chargesID.push(object.slice(9))
        }
    }

    jcCharges.find({ _id: { $in: chargesID } }, function (err, documentCharges) {
        for (charge of documentCharges) {
            charge.pleaCase = Boolean(Number(lawsuitOutcome[charge._id]))
            charge.save()
        }
    })

    jcComplaints.find({ record: this.jcRecord }, function (err, documentComplaint) {
        documentComplaint[0].report = closing.report
        documentComplaint[0].save()
    })

    this.done = true
    this.save(function (err) {
        callback(null)
    })
}
