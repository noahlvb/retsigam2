module.exports = function (report, action, callback) {
    this.report = report

    if (action == 'opslaan') {
        this.save(function (err) {
            callback(null, 'saved')
        })
    } else if (action == 'aannemen') {
        this.reportAccepted = true
        this.reportAcceptedDate = new Date()
        this.save(function (err) {
            callback(null, 'accepted')
        })
    }
}
