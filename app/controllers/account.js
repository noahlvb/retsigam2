const express = require('express')
const passport = require('passport')

const users = require('./../models/users')
const auth = require('./../middlewares/auth')

const router = express.Router()

router.get('/login', function (req, res) {
    res.set({ 'Content-Type' : 'text/html' })
    res.render('login')
})

router.post('/login/local',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/account/login',
        failureFlash: true
    })
)

router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
})

router.get('/manage', auth.groups(['admin']), function (req, res) {
    res.set({ 'Content-Type' : 'text/html' })
    res.render('accountManage')
})

router.get('/manage/add', auth.groups(['admin']), function (req, res) {
    res.render('accountAdd')
})

router.post('/manage/add', auth.groups(['admin']), function (req, res) {

    for (var key in req.body) {
        if (req.body[key].length <= 0) {
            req.flash('warning', res.__('ACCOUNTADD_flashFillFields'))
            return res.redirect('/account/manage/add')
        }
    }

    users.add(req.body, function (feedback, username) {
        if (feedback[0] === true) {
            req.flash('info', res.__('ACCOUNTADD_flashSucces') + username)
            res.redirect('/account/manage')
        } else {
            if (feedback[1] == 1) {
                req.flash('error', res.__('ACCOUNTADD_flashError'))
            } else if (feedback[1] == 2) {
                req.flash('warning', res.__('ACCOUNTADD_flashExisting'))
            }

            res.redirect('/account/manage/add')
        }
    })
})

router.get('/userList', auth.groups(['admin']), function (req, res) {
    users.find({}, function (err, document) {
        if (err) {
            return console.error(err)
        }

        res.json(document)
    })
})

module.exports = router
