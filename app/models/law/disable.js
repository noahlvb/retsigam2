module.exports = function (callback) {
    if (this.enabled) {
        this.enabled = false
        this.save(function (err) {
            callback(null)
        })
    } else {
        callback('lawDisabled')
    }
}
