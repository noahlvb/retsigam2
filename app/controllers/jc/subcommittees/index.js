const express = require('express');

const auth = require('./../../../middlewares/auth')

const router = express.Router()

router.get('/:id', auth.auth, require('./view'))
router.post('/:id', auth.auth, require('./report'))

module.exports = router
