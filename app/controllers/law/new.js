const laws = require('./../../models/law')

module.exports = function (req, res) {
    laws.new(req.body, function (err, number) {
        if (err && err == 'notAllFields') {
            req.flash('warning', 'Niet alle velden zijn ingevuld!')
            return res.redirect('/law')
        } else if (err && err == 'dubbleNumber') {
            req.flash('error', 'Het gekozen regelnummer is al ingebruik!')
            return res.redirect('/law')
        }

        req.flash('info', `Regel ${number} is toegevoegd!`)
        res.redirect('/law')
    })

}
