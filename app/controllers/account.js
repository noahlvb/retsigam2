const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/login', function (req, res) {
    res.set({ 'Content-Type' : 'text/html' })
    res.render('login')
})

router.post('/login/local', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/account/login',
    failureFlash: true
}))

router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
})

module.exports = router
