const mongoose = require('mongoose')

const namesConverter = require('./../../../helpers/namesConverter')
const jcCharges = require('./../../../models/jcCharge')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcCharges.new(req.params.id, req.body, function (err) {
            if (err && err == 'complaintNoExist'){
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            } else if (err && err == 'notAllFields'){
                req.flash('warning', 'Vul alle velden in!')
                return res.redirect('/jc/complaint/' + req.params.id)
            } else if (err && err == 'noNames'){
                req.flash('warning', 'Geef een naam op!')
                return res.redirect('/jc/complaint/' + req.params.id)
            } else if (err && err == 'LawNoExist'){
                req.flash('warning', 'Deze regel bestaat niet!')
                return res.redirect('/jc/complaint/' + req.params.id)
            } else if (err && err == 'chargeAlreadyExists'){
                req.flash('error', 'Deze aanklacht is al gemaakt')
                return res.redirect('/jc/complaint/' + req.params.id)
            }

            req.flash('info', 'Aanklacht aangemaakt')
            res.redirect('/jc/complaint/' + req.params.id)
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
}
