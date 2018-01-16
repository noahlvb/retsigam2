const jcSanctions = require('./../../../models/jcSanction')

module.exports = function (req, res) {
    jcSanctions.find({ done: false }, function (err, document) {
        res.render('jc/sanctions', { sanctions: document })
    })
}
