const mongoose = require('mongoose')

const loadConfig = require('./app/helpers/configLoader')

cwd = __dirname

console.log('Retsigam2 is starting!')
console.log('Running on node version: ' + process.version);

loadConfig().then(function (config) {
    mongoose.connect(config.db, { useMongoClient: true })
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
    mongoose.connection.once('open', function () {
        require('./app/app')(config)
        require('./app/workers')
    })
})
