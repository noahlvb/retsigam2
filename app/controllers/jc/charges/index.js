const express = require('express');
const async = require('async');

const auth = require('./../../../middlewares/auth')

const router = express.Router()

router.get('/overview', auth.groups(['jc']), require('./overview'))
router.get('/proceeding/:id/:action', auth.groups(['jc']), require('./proceeding'))
router.post('/:id', auth.groups(['jc']), require('./new'))

module.exports = router
