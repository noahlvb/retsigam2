const schoolmeetings = require('./../schoolmeeting')
const lawsuits = require('./../jcLawsuit')

function checkAlreadySendTo (record) {
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

function checkOpenLawsuits (record) {
    return new Promise(function (resolve, reject) {
        lawsuits.find({ jcRecord: record, done: false }, function (err, document) {
            if (err) {
                return console.log(err);
            }

            if (document.length != 0) {
                resolve(true)
            }

            resolve(false)
        })
    })
}

module.exports = function (callback) {
    schoolmeetings.find({ type: 'regular' }, null, { sort: {datetime: -1}, limit: 1 }, async function (err, document) {
        if (err) {
            return console.log(err)
        }

        if (await checkAlreadySendTo(this.record)) {
            return callback('alreadyAdded')
        }
        
        if (await checkOpenLawsuits(this.record)) {
            return callback('openLawsuits')
        }

        for (complaint of document[0].jcComplaints) {
            if (complaint.record == this.record) {
                document.splice(0, 1)
            }
        }

        if (document == 0) {
            return callback('double')
        }

        document[0].jcComplaints.push({ record: this.record })
        document[0].save(function (err) {
            callback(null, document[0].datetime)
        })
    }.bind(this))
}
