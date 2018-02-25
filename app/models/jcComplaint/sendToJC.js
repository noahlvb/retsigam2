const schoolmeetings = require('./../schoolmeeting')

function AllowedToAdd (record) {
    return new Promise(function (resolve, reject) {
        schoolmeetings.find({
            '$and' : [
                { 'jcComplaints.record': { '$in': [record] } },
                { '$or': [
                    { 'jcComplaints.approved': { $exists: false } },
                    { 'jcComplaints.approved': true }
                ] }
            ]
        }, function (err, document) {
            if (document.length > 0) {
                return resolve(true)
            }

            resolve(false)
        })
    })
}

module.exports = function (callback) {
    schoolmeetings.find({ type: 'regular' }, null, { sort: {datetime: -1} }, async function (err, document) {
        if (err) {
            return console.log(err);
        }

        if (await AllowedToAdd(this.record)) {
            return callback('alreadyAdded')
        }

        document[0].jcComplaints.push({ record: this.record })
        document[0].save(function (err) {
            callback(null, document[0].datetime)
        })
    }.bind(this))
}
