const laws = require('./../../models/law')

module.exports = function (req, res) {
    laws.find({}, null, { sort: { number: 1 } }, function (err, document) {
        if (err) {
            return console.log(err)
        }

        res.render('laws', { laws: document })
    })
}
