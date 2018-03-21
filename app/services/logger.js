const fs = require('fs')
const winston = require('winston')
winston.emitErrs = true

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs')
}

let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: cwd + '/logs/all.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize:false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
})

module.exports = logger
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message)
    }
}
