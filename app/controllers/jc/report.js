const mongoose = require('mongoose');

const jcComplaints = require('./../../models/jcComplaint')

module.exports =  function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({ _id: req.params.id }, function (err, documentComplaint) {
            if (documentComplaint.length == 0) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            documentComplaint[0].reportSaveAccept(req.body.report, req.body.saveApply, function (err, action) {
                if (action == 'saved') {
                    req.flash('info', 'Het JC raport is opgeslagen')
                }
                if (action == 'accepted') {
                    req.flash('info', 'Het JC raport is aangenomen')
                }

                return res.redirect('/jc/complaint/' + req.params.id)
            })
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
}
