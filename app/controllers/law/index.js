const express = require('express');
const mongoose = require('mongoose');

const auth = require('./../../middlewares/auth')

const router = express.Router()

router.get('/', require('./overview'))
router.post('/', auth.groups(['rechtscoordinator']), require('./new'))
router.post('/:id', auth.groups(['rechtscoordinator']), require('./edit'))
router.get('/:id/disable', auth.groups(['rechtscoordinator']), require('./disable'))

module.exports = router
