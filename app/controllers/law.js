const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../middlewares/auth')
const laws = require('./../models/law')

const router = express.Router()

router.get('/', function (req, res) {
    laws.find({}, function (err, document) {
        if (err) {
            return console.log(err);
        }

        res.render('laws', { laws: document })
    })
})

router.post('/', auth.groups(['rechtscoordinator']), function (req, res) {
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
})

router.post('/:id', auth.groups(['rechtscoordinator']), function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        if (req.body.content === '' || req.body.content === null || req.body.content === undefined) {
            req.flash('warning', 'Niet alle velden zijn ingevuld!')
            return res.redirect('/law')
        }

        laws.findOne({ _id: req.params.id }, function (err, document) {
            document.content = req.body.content
            document.save(function (err) {
                req.flash('info', 'Regel succesvol bijgewerkt')
                res.redirect('/law')
            })
        })

    } else {
        req.flash('warning', 'Deze regel bestaat niet!')
        return res.redirect('/law')
    }
})

router.post('/:id', auth.groups(['rechtscoordinator']), function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        if (req.body.content === '' || req.body.content === null || req.body.content === undefined) {
            req.flash('warning', 'Niet alle velden zijn ingevuld!')
            return res.redirect('/law')
        }

        laws.findOne({ _id: req.params.id }, function (err, document) {
            if (document.enabled) {
                document.content = req.body.content
                document.save(function (err) {
                    req.flash('info', 'Regel succesvol bijgewerkt')
                    res.redirect('/law')
                })
            } else {
                req.flash('error', 'Deze regel is uitgeschakeld')
                res.redirect('/law')
            }
        })

    } else {
        req.flash('warning', 'Deze regel bestaat niet!')
        return res.redirect('/law')
    }
})

router.get('/:id/disable', auth.groups(['rechtscoordinator']), function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        laws.findOne({ _id: req.params.id }, function (err, document) {
            if (document.enabled) {
                document.enabled = false
                document.save(function (err) {
                    req.flash('info', 'Regel succesvol uitgeschakeld')
                    res.redirect('/law')
                })
            } else {
                req.flash('error', 'Deze regel is uitgeschakeld')
                res.redirect('/law')
            }
        })

    } else {
        req.flash('warning', 'Deze regel bestaat niet!')
        return res.redirect('/law')
    }
})

module.exports = router
