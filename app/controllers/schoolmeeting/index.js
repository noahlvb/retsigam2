const express = require('express')

const auth = require('./../../middlewares/auth')

const router = express.Router()

router.use('/', auth.auth, require('./overview'))

module.exports = router
