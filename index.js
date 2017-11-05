const mongoose = require('mongoose')

const config = require('./app/config')

console.log('Retsigam2 is starting!')

cwd = __dirname

mongoose.connect(config.db, { useMongoClient: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function () {
    require('./app/app')
})
