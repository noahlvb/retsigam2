const mongoose = require('mongoose');

const jcComplaints = require('./../../../models/jcComplaint')
const jcSanctions = require('./../../../models/jcSanction')
const namesConverter = require('./../../../helpers/namesConverter')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcSanctions.new(req.params.id, req.body, function (err) {
            if (err && err == 'complaintNoExist'){
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            } else if (err && err == 'notAllFields'){
                req.flash('warning', 'Vul alle velden in!')
                return res.redirect('/jc/complaint/' + req.params.id)
            } else if (err && err == 'noNames'){
                req.flash('warning', 'Geef een naam op!')
                return res.redirect('/jc/complaint/' + req.params.id)
            } else if (err && err == 'dubbleSanction'){
                req.flash('warning', 'Er is al een sanctie gemaakt voor deze persoon!')
                return res.redirect('/jc/complaint/' + req.params.id)
            }

            req.flash('info', 'Sanctie is aangemaakt')
            res.redirect('/jc/complaint/' + req.params.id)
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
}
