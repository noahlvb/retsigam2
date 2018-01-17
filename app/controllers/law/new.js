const laws = require('./../../models/law')

module.exports = function (req, res) {
    for (field in req.body) {
        if (req.body[field] === '' || req.body[field] === null || req.body[field] === undefined) {
            req.flash('warning', 'Niet alle velden zijn ingevuld!')
            return res.redirect('/law')
        }
    }

    let document = {
        number: req.body.number,
        content: req.body.content,
        enabled: true
    }

    new laws(document).save(function (err, document) {
        if (err) {
            req.flash('error', 'Het gekozen regelnummer is al ingebruik!')
            return res.redirect('/law')
        }

        req.flash('info', `Regel ${req.body.number} is toegevoegd!`)
        res.redirect('/law')
    })
}
