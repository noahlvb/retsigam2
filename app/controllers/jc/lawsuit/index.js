const AbstractController = require('./../../AbstractController')

class LawsuitController extends AbstractController {
    registerRoutes() {
        this.router.get('/', this.auth(['schoolMeetingVoorzitter']), require('./overview'))
        this.router.get('/:id', this.auth(['schoolMeetingVoorzitter']), require('./view'))
        this.router.post('/schedule/:id', this.auth(['schoolMeetingVoorzitter']), require('./schedule'))
        this.router.post('/close/:id', this.auth(['schoolMeetingVoorzitter']), require('./close'))
        this.router.post('/create', this.auth(['jc']), require('./new'))
    }
}

module.exports = LawsuitController
