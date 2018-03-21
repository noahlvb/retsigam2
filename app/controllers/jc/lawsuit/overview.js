const jcLawsuits = require('./../../../models/jcLawsuit')

module.exports = function (req, res) {
    jcLawsuits.find({}, function (err, document) {
        if (err) {
            return console.log(err)
        }

        res.render('jc/lawsuit/overview', { lawsuits: document })
    })
}
