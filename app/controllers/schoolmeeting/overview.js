const schoolmeetings = require('./../../models/schoolmeeting')

module.exports = function (req, res) {
    schoolmeetings.find({}, null, { sort: {datetime: -1} }, function (err, document) {
        res.render('schoolmeeting/overview', { schoolmeetings: document })
    })
}
