const express = require('express')
const passport = require('passport')

const users = require('./../../models/users')
const auth = require('./../../middlewares/auth')

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

router.get('/manage/:id', auth.groups(['admin']), function (req, res) {
    users.findOne({ _id: req.params.id }, function (err, document) {
        if (err) {
            return console.log(err)
        }

        res.render('accountManageIndiv', { userProfile: document})
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

router.post('/manage/add', auth.groups(['admin']), require('./new'))
router.get('/manage/:id/delete', auth.groups(['admin']), require('./delete'))
router.post('/manage/:id/group/add', auth.groups(['admin']), require('./groupAdd'))
router.get('/manage/:id/group/remove', auth.groups(['admin']), require('./groupRemove'))

module.exports = router
