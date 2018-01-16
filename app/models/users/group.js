module.exports = function (action, group, callback) {
    if (action == 'add') {
        if (this.groups.indexOf(group) == -1) {
            this.groups.push(group)
            this.save()
            callback(0)
        } else {
            callback(2)
        }
    } else if (action == 'remove') {
        if (this.groups.indexOf(group) != -1) {
            this.groups.splice(this.groups.indexOf(group), 1)
            this.save()
            callback(0)
        } else {
            callback(2)
        }
    } else {
        callback(1)
    }
}
