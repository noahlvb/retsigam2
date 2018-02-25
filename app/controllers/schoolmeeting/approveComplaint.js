const mongoose = require('mongoose');

const schoolmeetings = require('./../../models/schoolmeeting')

module.exports = function (req, res) {
    schoolmeetings.approveComplaint(req.params.record, req.params.action, function (err, schoolmeetingID) {
        if (err && err == 'noSchoolmeeting') {
            req.flash('warning', 'Deze klacht is nog niet doorgestuurd naar een schoolmeeting!')
        } else if (err && err == 'noAction') {
            req.flash('warning', 'Deze actie is niet mogelijk!')
        } else {
            req.flash('info', 'klacht is afgehandeld')
        }

        return res.redirect('/schoolmeeting/' + schoolmeetingID)
    })
}
