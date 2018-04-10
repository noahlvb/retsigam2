const mongoose = require('mongoose')

const jcComplaints = require('./../../models/jcComplaint')

module.exports = function (req, res) {
    console.log(req);
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({ _id: req.params.id }, function (err, documentComplaint) {
            if (documentComplaint.length == 0) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            documentComplaint[0].notesSave(req.body.notes, function (err) {
                req.flash('info', 'De notities zijn opgeslagen')
                return res.redirect('/jc/complaint/' + req.params.id)
            })
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
}
