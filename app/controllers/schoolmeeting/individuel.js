const mongoose = require('mongoose')

const schoolmeetings = require('./../../models/schoolmeeting')

module.exports = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        schoolmeetings.find({ _id: req.params.id }, function (err, document) {
            res.render('schoolmeeting/individuel', { schoolmeeting: document[0] })
        })
    } else {
        req.flash('warning', 'Deze schoolmeeting bestaat niet!')
        return res.redirect('/schoolmeeting')
    }
}
