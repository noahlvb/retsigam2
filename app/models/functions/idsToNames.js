const async = require('async');

const users = require('./../users')

module.exports = function (convertFields) {
    return function (document, next) {
        calls = []

        document.forEach(function (doc, index) {
            calls.push(function (callback) {
                calls = []
                convertFields.forEach(function (field) {
                    document[index][field].forEach(function (id, indexId) {
                        calls.push(function (callback) {
                            users.findOne({_id: id}, function (err, documentUser) {
                                if (err) {
                                    return console.log(err);
                                }

                                document[index][field][indexId] = [id, documentUser.username]

                                callback()
                            })
                        })
                    })
                })
                async.parallel(calls, function (err, result) {
                    callback()
                })
            })
        })

        async.parallel(calls, function (err, result) {
            next()
        })
    }
}
