const fs = require('fs');

module.exports = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile('./config.json', 'utf8', function (err, data) {
            resolve(JSON.parse(data))
        })
    })
}
