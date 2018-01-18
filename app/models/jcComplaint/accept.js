module.exports = function (action, assigned, callback) {
    if (!this.accepted && action == 'accept') {
        this.accepted = true
        this.save()
        callback(null, 'accepted')
    } else if (!this.accepted && action == 'deny') {
        this.accepted = false
        this.save()
        callback(null, 'denied')
    } else {
        callback('noAction')
    }
}
