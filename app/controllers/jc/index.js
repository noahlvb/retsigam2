const express = require('express')

const auth = require('./../../middlewares/auth')
const jcComplaints = require('./../../models/jcComplaint');
const namesConverter = require('./../../helpers/namesConverter')

const router = express.Router()

router.use('/complaint', require('./complaint'))

router.get('/overview', auth.groups(['jc']), function (req, res) {
    jcComplaints.find({}, function (err, document) {
        // this name conversion is still under construction
        namesConverter.toName(document[0].accused, function(peopleNames) {
            document[0].accused = peopleNames
            res.render('jc/overview', {complaints: document})
        })
    })
})

router.get('/apply', auth.auth, function (req, res) {
    res.render('jc/apply')
})

router.post('/apply', auth.auth, function (req, res) {
    jcComplaints.apply(req.user, req.body, function (feedback) {
        if (feedback === 0) {
            req.flash('info', 'Klacht succesvol opgebracht')
        } else if (feedback === 1) {
            req.flash('error', 'Er is iets mis gegaan')
        } else if (feedback === 2) {
            req.flash('warning', 'Not all fields are filled in!')
            return res.redirect('/jc/apply')
        }
        res.redirect('/')
    })
})

module.exports = router