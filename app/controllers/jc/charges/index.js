const express = require('express');

const auth = require('./../../../middlewares/auth')

const router = express.Router()

router.get('/proceeding/:id/:action', auth.groups(['jc']), require('./proceeding'))
router.post('/:id', auth.groups(['jc']), require('./new'))

module.exports = router
