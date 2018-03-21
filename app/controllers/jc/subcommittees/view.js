const mongoose = require('mongoose')

const jcSubcommittees = require('./../../../models/jcSubcommittee')
const jcComplaints = require('./../../../models/jcComplaint')

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

            jcComplaints.find({record: documentSubcommittee[0].complaint}, function (err, documentComplaint) {
                res.render('jc/subcommittee', {subcommittee: documentSubcommittee[0], complaint: documentComplaint[0]})
            })
        })
    } else {
        req.flash('warning', 'Dit subcommittee bestaat niet!')
        return res.redirect('/')
    }
}
