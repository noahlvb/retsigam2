const AbstractController = require('./../AbstractController')

class SchoolmeetingController extends AbstractController {
    registerRoutes() {
        this.router.get('/', this.auth(), require('./overview'))
        this.router.get('/:id', this.auth(), require('./individuel'))
        this.router.get('/approve/:record/:action', this.auth(['schoolMeetingVoorzitter']), require('./approveComplaint'))
    }
}

module.exports = SchoolmeetingController
