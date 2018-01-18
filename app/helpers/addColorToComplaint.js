const async = require('async');

const complaintStadium = require('./complaintStadium')

module.exports = function (document, callback) {
    calls = []

    document.forEach(function (doc, index) {
        calls.push(function (callback) {
            complaintStadium(document[index], function (stadium) {
                let colorClass

                if (stadium == 'lawsuit') {
                    colorClass = 'blue darken-2'
                } else if (stadium == 'proceeding') {
                    colorClass = 'yellow'
                } else if (stadium == 'subcommitteeWorking') {
                    colorClass = 'blue lighten-1'
                } else if (stadium == 'accepted') {
                    colorClass = 'yellow'
                }

                document[index].tableColor = colorClass

                callback()
            })
        })
    })

    async.parallel(calls, function (err, result) {
        callback(document)
    })
}
