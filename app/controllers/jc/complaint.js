const express = require('express');

const auth = require('./../../middlewares/auth')

const router = express.Router()

router.get('/:id', auth.groups(['jc']), function (req, res) {
    res.render('jc/complaint')
})

module.exports = router
