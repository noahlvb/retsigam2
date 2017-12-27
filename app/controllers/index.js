const express = require('express')

const auth = require('./../middlewares/auth')

const jcSubcommittees = require('./../models/jcSubcommittee')

const router = express.Router()

router.use('/account', require('./account'))
router.use('/jc', require('./jc'))

router.get('/', auth.auth, function (req, res) {
    jcSubcommittees.find({
        $and: [
            { assigned: { '$in': [req.user._id] } },
            { done: false }
        ]
    }, function (err, document) {
        res.render('home', { jcSubcommittees: document })
    })
})

router.use(function (req, res) {
    res.status(404).render('error/404', { page_url : req.hostname + req.path })
})

module.exports = router
