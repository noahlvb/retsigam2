const jcSubcommittees = require('./../jcSubcommittee')

module.exports = function (action, assigned, callback) {
    if (!this.accepted && action == 'accept') {
        this.accepted = true
        this.save()
        callback(null, 'accepted')
    } else if (!this.accepted && action == 'deny') {
        this.accepted = false
        this.save()
        callback(null, 'denied')
    } else if (!this.accepted && action == 'subcommittee') {
        jcSubcommittees.create(this, assigned, function (err) {
            if (err && err == 'subcommitteeNoPeople') {
                callback('subcommitteeNoPeople')
            } else if (err) {
                callback('subcommitteeFailed')
            } else {
                callback(null, 'subcommitteeOK')
            }
        })
    } else {
        callback('noAction')
    }
}
