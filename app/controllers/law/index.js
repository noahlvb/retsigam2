const express = require('express');

const auth = require('./../../middlewares/auth')
const laws = require('./../../models/law')

const router = express.Router()

router.get('/', function (req, res) {
    laws.find({}, function (err, document) {
        if (err) {
            return console.log(err);
        }

        res.render('laws', { laws: document })
    })
})

router.post('/', function (req, res) {
    for (field in req.body) {
        if (req.body[field] === '' || req.body[field] === null || req.body[field] === undefined) {
            req.flash('warning', 'Niet alle velden zijn ingevuld!')
            return res.redirect('/law')
        }
    }

    let document = {
        number: req.body.number,
        content: req.body.content
    }

    new laws(document).save(function (err, document) {
        if (err) {
            req.flash('error', 'Het gekozen regelnummer is al ingebruik!')
            return res.redirect('/law')
        }

        req.flash('info', `Regel ${req.body.number} is toegevoegd!`)
        res.redirect('/law')
    })
})

module.exports = router
