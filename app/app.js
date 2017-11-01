const express = require('express')
const sessions = require('express-session')
const flash = require('express-flash')
const bodyParser = require('body-parser')
const connectMongo = require('connect-mongo')(sessions)
const passport = require('passport')

const config = require('./config')
const app = express()

app.use(flash())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessions({
    secret: config.secret,
    store: new connectMongo({ url : config.db }),
    cookie: {maxAge: 24 * 60 * 60 * 1000},
    resave: false,
    saveUninitialized: false
}))

// Passport middleware
require('./helpers/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(require('./controllers'))

app.listen(config.webPort, function () {
    console.log('WebApp is running on port: ' + config.webPort + '!')
})
