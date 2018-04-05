const AbstractController = require('./../../AbstractController')

class LawsuitController extends AbstractController {
    registerRoutes() {
        this.router.get('/', this.auth(['schoolMeetingVoorzitter']), require('./overview'))
        this.router.post('/schedule/:id', this.auth(['schoolMeetingVoorzitter']), require('./schedule'))
        this.router.post('/close/:id', this.auth(['schoolMeetingVoorzitter']), require('./close'))
        this.router.post('/create', this.auth(['jc']), require('./new'))
        this.router.get('/:id', this.auth(['schoolMeetingVoorzitter']), require('./view'))
    }
}

module.exports = LawsuitController
