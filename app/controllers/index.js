const express = require('express')
const async = require('async');

const auth = require('./../middlewares/auth')

const jcSubcommittees = require('./../models/jcSubcommittee')
const jcLawsuits = require('./../models/jcLawsuit')
const jcSanctions = require('./../models/jcSanction')

const router = express.Router()

router.use('/account', require('./account'))
router.use('/jc', require('./jc'))
router.use('/law', require('./law'))
router.use('/schoolmeeting', require('./schoolmeeting'))

router.get('/', auth.auth, function (req, res) {
    async.parallel({
        subcommittees: function (callback) {
            jcSubcommittees.find({
                $and: [
                    { assigned: { '$in': [req.user._id] } },
                    { done: false }
                ]
            }, function (err, document) {
                callback(null, document)
            })
        },
        lawsuits: function (callback) {
            jcLawsuits.find({
                $and: [
                    { jury: { '$in': [req.user._id] } }
                ]
            }, function (err, document) {
                callback(null, document)
            })
        },
        sanctions: function (callback) {
            jcSanctions.find({
                $and: [
                    { offender: { '$in': [req.user._id] } },
                    { done: false }
                ]
            }, function (err, document) {
                callback(null, document)
            })
        }
    }, function (err, result) {
        res.render('home', { jcSubcommittees: result.subcommittees, lawsuits: result.lawsuits, sanctions: result.sanctions })
    })
})

router.use(function (req, res) {
    res.status(404).render('error/404', { page_url : req.hostname + req.path })
})

module.exports = router
