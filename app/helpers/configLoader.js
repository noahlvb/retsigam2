const fs = require('fs');

let fallback = {
    "webPort": process.env.PORT,
    "secret": process.env.secret,
    "db": process.env.db
}

module.exports = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile('./config.json', 'utf8', function (err, data) {
            if (err) {
                resolve(fallback)
            } else {
                resolve(JSON.parse(data))
            }
        })
    })
}
