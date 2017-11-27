const express = require('express')

const auth = require('./../middlewares/auth')

const router = express.Router()

router.use('/account', require('./account'))
router.use('/jc', require('./jc'))

router.get('/', auth.auth, function (req, res) {
    res.render('home')
})

router.use(function (req, res) {
    res.status(404).render('error/404', { page_url : req.hostname + req.path })
})

module.exports = router
