const jcComplaints = require('./../../models/jcComplaint')

module.exports = function (report, action, callback) {
    this.report = report

    if (action == 'opslaan') {
        this.save(function (err) {
            callback(null, 'saved')
        })
    } else if (action == 'inleveren') {
        this.done = true
        this.save(function (err) {
            jcComplaints.find({ record: this.complaint }, function (err, documentComplaint) {
                documentComplaint[0].accepted = true
                documentComplaint[0].save(function (err) {
                    callback(null, 'sendIn')
                })
            })
        })
    }
}
