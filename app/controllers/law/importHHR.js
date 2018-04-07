const importHHR = require('./../../services/importHHR')

module.exports = function (req, res) {
    importHHR(req.file, function (err) {
        if (err) {
            req.flash('warning', 'An error happend!')
        } else {
            req.flash('info', 'Het bestand ' + req.file.originalname + ' is succesvol geimporteerd')
        }

        res.redirect('/law')
    })
}
