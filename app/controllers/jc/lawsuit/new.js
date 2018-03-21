const async = require('async')

const jcLawsuits = require('./../../../models/jcLawsuit')

module.exports = function (req, res) {
    let complaint = JSON.parse(req.body.complaint)

    jcLawsuits.new(complaint, req.body, function (err, record) {
        if (err == 'namesIncorrect') {
            req.flash('warning', 'Kies een persoon als aanklager')
            return res.redirect('/jc/complaint/' + complaint._id)
        } else if (err == 'noComplaint') {
            req.flash('warning', 'Deze klacht bestaat niet!')
            return res.redirect('/jc/overview')
        } else if (err == 'noChargeExist') {
            req.flash('warning', 'Deze aanklacht bestaat niet!')
            return res.redirect('/jc/complaint/' + complaint._id)
        } else if (err == 'noCharge') {
            req.flash('warning', 'Er is geen aanklacht geselecteerd!')
            return res.redirect('/jc/complaint/' + complaint._id)
        } else if (err == 'chargeAlreadyInLawsuit') {
            req.flash('warning', 'Een van de aanklachten hoort al bij een rechtzaak')
            return res.redirect('/jc/complaint/' + complaint._id)
        } else if (err == 'wrongCombination') {
            req.flash('warning', 'Een rechtzaak mag enkel over 1 of meerdere regels/personen gaan maar niet tergelijkertijd!')
            return res.redirect('/jc/complaint/' + complaint._id)
        }

        req.flash('info', 'Rechtzaak met nummer: ' + record + ' aangemaakt!')
        res.redirect('/jc/complaint/' + complaint._id)
    })
}
