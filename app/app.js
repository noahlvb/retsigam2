const express = require('express')
const sessions = require('express-session')
const flash = require('express-flash')
const ejsLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const connectMongo = require('connect-mongo')(sessions)
const passport = require('passport')
const gitRev = require('git-rev')
const helmet = require('helmet')

const logger = require('./services/logger')

function App (config) {
    const app = express()

    app.use(helmet())
    require('./helpers/passport')(passport)

    app.set('view engine', 'ejs')
    app.set('views', __dirname + '/views')
    app.use('/public', express.static(__dirname + '/public'))
    app.use(ejsLayout)
    app.use(require('./helpers/langauge'))
    gitRev.short(function(str){
        app.locals.commit = str
    })

    app.use(flash())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(sessions({
        secret: config.secret,
        store: new connectMongo({ url : config.db }),
        cookie: {maxAge: 24 * 60 * 60 * 1000},
        resave: false,
        saveUninitialized: false
    }))

    // Passport middleware
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(require('./middlewares/insertUserProfile'))
    app.use(require('./middlewares/autocompleteUsers'))

    app.use(require('morgan')('combined', { "stream": logger.stream }))

    app.use(function (err, req, res, next) {
        res.status(500).render('error/500', { error : err })
    })

    app.use(new (require('./controllers')))

    app.listen(config.webPort, function () {
        console.log('WebApp is running on port: ' + config.webPort + '!')
    })
}

module.exports = App
