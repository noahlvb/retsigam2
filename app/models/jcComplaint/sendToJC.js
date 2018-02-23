const schoolmeetings = require('./../schoolmeeting')

function alreadyAdded (record) {
    return new Promise(function (resolve, reject) {
        schoolmeetings.find({ jcComplaints: { '$in': [record] } }, function (err, document) {
            for (schoolmeeting of document) {
                if (schoolmeeting.jcComplaints.indexOf(record) != -1) {
                    return resolve(true)
                }
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

        if (await alreadyAdded(this.record)) {
            return callback('alreadyAdded')
        }

        document[0].jcComplaints.push(this.record)
        document[0].save(function (err) {
            callback(null, document[0].datetime)
        })
    }.bind(this))
}
