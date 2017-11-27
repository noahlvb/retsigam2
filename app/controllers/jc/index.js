const express = require('express')

const auth = require('./../../middlewares/auth')

const router = express.Router()

router.get('/apply', auth.auth, function (req, res) {
    res.render('jc/apply')
})

module.exports = router
