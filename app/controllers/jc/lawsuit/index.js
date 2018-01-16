const express = require('express');

const auth = require('./../../../middlewares/auth')

const router = express.Router()

router.get('/', auth.groups(['schoolMeetingVoorzitter']), require('./overview'))
router.get('/:id', auth.groups(['schoolMeetingVoorzitter']), require('./view'))
router.post('/schedule/:id', auth.groups(['schoolMeetingVoorzitter']), require('./schedule'))
router.post('/close/:id', auth.groups(['schoolMeetingVoorzitter']), require('./close'))
router.post('/create', auth.groups(['jc']), require('./new'))

module.exports = router
