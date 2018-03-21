const jcComplaints = require('./../../models/jcComplaint')
const addColorToComplaint = require('./../../helpers/addColorToComplaint')

module.exports = function (req, res) {
    jcComplaints.find({}, function (err, document) {
        addColorToComplaint(document, function (document) {
            res.render('jc/overview', {complaints: document})
        })
    })
}
