module.exports = function (record, action, callback) {
    this.find({ 'jcComplaints.record': { '$in': [record] } }, null, { sort: {datetime: -1} }, function (err, document) {
        if (document.length == 0) {
            callback('noSchoolmeeting')
        }

        let indexOfComplaint
        for (complaint of document[0].jcComplaints) {
            if (complaint.record == record) {
                indexOfComplaint = document[0].jcComplaints.indexOf(complaint)
            }
        }

        if (document[0].jcComplaints[indexOfComplaint].approved == undefined && action == 'true' ) {
            document[0].jcComplaints[indexOfComplaint].approved = true
            document[0].markModified('jcComplaints')
            document[0].save()
            callback(null, document[0]._id)
        } else if (document[0].jcComplaints[indexOfComplaint].approved == undefined && action == 'false' ) {
            document[0].jcComplaints[indexOfComplaint].approved = false
            document[0].markModified('jcComplaints')
            document[0].save()
            callback(null, document[0]._id)
        } else {
            callback('noAction', document[0]._id)
        }
    })
}
