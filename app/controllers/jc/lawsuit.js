const express = require('express');

const auth = require('./../../middlewares/auth')

const router = express.Router()

router.post('/create', auth.groups(['jc']), function (req, res) {
    console.log(req.body);

    res.redirect('/jc/overview/')
})

module.exports = router
