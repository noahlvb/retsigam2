const fs = require('fs');
const readline = require('readline');

const laws = require('./../models/law')

module.exports = function (file, callback) {
    let HHR = []

    var lineReader = readline.createInterface({
        input: require('fs').createReadStream(file.path, 'utf8')
    })

    lineReader.on('line', function (line) {
        let number = line.split(/,(.+)/)[0].trim()
        if (number.length != 0 && !isNaN(number[0])) {
            let role = {
                number: line.split(/,(.+)/)[0],
                content: line.split(/,(.+)/)[1]
            }

            HHR.push(role)
        }

    })

    lineReader.on('error', function () {
        return callback('err')
    })

    lineReader.on('close', function () {
        let rolesToProcess = HHR.map((role) => {
            return new Promise((resolve) => {
                laws.new(role, function () {
                    resolve()
                })
            })
        })

        Promise.all(rolesToProcess).then(() => {
            callback()
        })
    })
}
