const AbstractController = require('./../AbstractController')

class SchoolmeetingController extends AbstractController {
    registerRoutes() {
        this.router.get('/', this.auth.auth, require('./overview'))
        this.router.get('/:id', this.auth.auth, require('./individuel'))
        this.router.get('/approve/:record/:action', this.auth.groups(['schoolMeetingVoorzitter']), require('./approveComplaint'))
    }
}

module.exports = SchoolmeetingController
