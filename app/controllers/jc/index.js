const express = require('express')

const auth = require('./../../middlewares/auth')
const jcComplaints = require('./../../models/jcComplaint');

const router = express.Router()

router.use('/complaint', require('./complaint'))
router.use('/accepting', require('./accepting'))
router.use('/subcommittees', require('./subcommittees'))
router.use('/report', require('./report'))
router.use('/charges', require('./charges'))
router.use('/lawsuit', require('./lawsuit'))
router.use('/sanction', require('./sanction'))

router.get('/overview', auth.groups(['jc']), function (req, res) {
    jcComplaints.find({}, function (err, document) {
        res.render('jc/overview', {complaints: document})
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
