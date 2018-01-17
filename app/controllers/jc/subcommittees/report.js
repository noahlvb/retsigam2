const mongoose = require('mongoose');

const jcSubcommittees = require('./../../../models/jcSubcommittee')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcSubcommittees.find({
            $and: [
                { assigned: { '$in': [req.user._id] } },
                { _id: req.params.id },
                { done: false }
            ]
        }, function (err, documentSubcommittee) {
            if (documentSubcommittee.length == 0) {
                req.flash('warning', 'Deze pagina is niet voor jouw bestemd')
                return res.redirect('/')
            }

            documentSubcommittee[0].reportSaveAccept(req.body.investigation, req.body.saveApply, function (err, action) {
                if (action == 'saved') {
                    req.flash('info', 'Het subcommittee onderzoek is opgeslagen')
                    return res.redirect('/jc/subcommittees/' + req.params.id)
                } else if (action == 'sendIn') {
                    req.flash('info', 'Het subcommittee onderzoek is afgerond')
                    return res.redirect('/')
                }
            })
        })
    } else {
        req.flash('warning', 'Dit subcommittee bestaat niet!')
        return res.redirect('/')
    }
}
