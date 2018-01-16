const express = require('express');

const auth = require('./../../../middlewares/auth')

const router = express.Router()

router.get('/overview', auth.groups(['jc']), require('./overview'))
router.get('/approve/:id', auth.groups(['jc']), require('./approve'))
router.post('/:id', auth.groups(['jc']), require('./new'))

module.exports = router
