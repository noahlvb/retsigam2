const namesConverter = require('./../../helpers/namesConverter');

module.exports = function (plans, callback) {
    if (new Date(plans.datetime).getTime() < new Date().getTime()) {
        return callback('pastDatetime')
    }

    namesConverter.toID(plans.jury, function (peopleIDs) {
        this.date = new Date(plans.datetime)
        this.jury = peopleIDs

        this.save(function (err) {
            callback(null)
        })
    }.bind(this))
}
