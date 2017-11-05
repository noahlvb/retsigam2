const i18n = require('i18n')

i18n.configure({
    locales: ['en', 'nl'],
    directory: cwd + '/app/locales',
    defaultLocale: 'en',
    cookie: 'lang'
})

module.exports = function (req, res, next) {
    i18n.init(req, res)
    res.locals.__ = res.__

    return next()
}
