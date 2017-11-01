const express = require('express')

const config = require('./config')
const app = express()

app.use(require('./controllers'))

app.listen(config.webPort, function () {
    console.log('WebApp is running on port: ' + config.webPort + '!')
})
