const mongoose = require('mongoose')

const jcSanctions = require('./../../../models/jcSanction')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcSanctions.find({ _id: req.params.id }, function (err, document) {
            if (err) {
                return console.log(err)
            }

            if (document.length == 0) {
                req.flash('warning', 'Deze sanctie bestaat niet!')
                return res.redirect('/jc/sanction/overview')
            }

            document[0].done = true
            document[0].save(function (err) {
                req.flash('info', 'Sanctie is goedgekeurd')
                res.redirect('/jc/sanction/overview')
            })
        })
    } else {
        req.flash('warning', 'Deze sanctie bestaat niet!')
        return res.redirect('/jc/overview')
    }
}
