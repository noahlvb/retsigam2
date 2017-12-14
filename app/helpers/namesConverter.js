const async = require('async');

const users = require('./../models/users');

module.exports.toID = function (peopleString, callback) {
    calls = []

    let people = peopleString.split(',')
    let peopleIDs = []

    people.forEach(function (person) {
        person = person.replace(/ /g,'')

        calls.push(function (callback) {
            users.findOne({username: person}, function (err, document) {
                if (err) {
                    return console.log(err);
                }

                if (document) {
                    peopleIDs.push(document._id)
                }

                callback()
            })
        })
    })

    async.parallel(calls, function (err, result) {
        callback(peopleIDs)
    })
}

// Currently not used
module.exports.toName = function (peopleIDs, callback) {
    calls = []

    peopleNames = []

    peopleIDs.forEach(function (person) {
        calls.push(function (callback) {
            users.findOne({_id: person}, function (err, document) {
                if (err) {
                    return console.log(err);
                }

                if (document) {
                    peopleNames.push(document.username)
                } else {
                    peopleNames.push(null)
                }

                callback()
            })
        })
    })

    async.parallel(calls, function (err, result) {
        callback(peopleNames)
    })
}
