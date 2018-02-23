const mongoose = require('mongoose')

const config = require('./config')

cwd = __dirname

console.log('Retsigam2 is starting!')
console.log('Running on node version: ' + process.version);

mongoose.connect(config.db, { useMongoClient: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function () {
    require('./app/app')
    require('./app/workers')
})
