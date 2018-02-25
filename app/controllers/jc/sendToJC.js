const mongoose = require('mongoose');

const jcComplaints = require('./../../models/jcComplaint')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        jcComplaints.find({ _id: req.params.id }, function (err, document) {
            if (err) {
                return console.log(err);
            }

            if (document.length == 0) {
                req.flash('warning', 'Deze klacht bestaat niet!')
                return res.redirect('/jc/overview')
            }

            document[0].sendToJC(function (err, schoolmeetingDate) {
                if (err && err == 'alreadyAdded') {
                    req.flash('warning', 'Deze klacht is al toegevoegd')
                } else if (err && err == 'double') {
                    req.flash('warning', 'Deze klacht kan niet worden doorgestuurd naar de schoolmeeting, probeer het later opnieuw! (eSM_1)')
                } else {
                    req.flash('info', 'Klacht is succesvol toegevoegd aan de schoolmeeting van ' + schoolmeetingDate)
                }

                res.redirect('/jc/complaint/' + req.params.id)
            })
        })
    } else {
        req.flash('warning', 'Deze klacht bestaat niet!')
        return res.redirect('/jc/overview')
    }
}
