const async = require('async');

const jcComplaints = require('./../../../models/jcComplaint')
const jcCharges = require('./../../../models/jcCharge')

module.exports = function (req, res) {
    async.parallel({
        complaints: function (callback) {
            jcComplaints.find({}, function (err, document) {
                callback(null, document)
            })
        },
        charges: function (callback) {
            jcCharges.find({}, function (err, document) {
                callback(null, document)
            })
        }
    }, function (err, result) {
        res.render('jc/charge/overview', { complaints: result.complaints, charges: result.charges })
    })
}
