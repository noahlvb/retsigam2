const express = require('express')

const auth = require('./../../middlewares/auth')
const jcComplaints = require('./../../models/jcComplaint');

const router = express.Router()

router.get('/apply', auth.auth, function (req, res) {
    res.render('jc/apply')
})

router.post('/apply', auth.auth, function (req, res) {
    for (field in req.body) {
        if ((req.body[field] === '' || req.body[field] === null || req.body[field] === undefined) && req.body[field] !== 'witnesses') {
            req.flash('warning', 'Not all fields are filled in!')
            return res.redirect('/jc/apply')
        }
    }

    jcComplaints.apply(req.user, req.body, function (feedback) {
        if (feedback === 0) {
            req.flash('info', 'Klacht succesvol opgebracht')
        } else if (feedback === 1) {
            req.flash('error', 'Er is iets mis gegaan')
        }
        res.redirect('/')
    })
})

module.exports = router
