const AbstractController = require('./../../AbstractController')

class LawsuitController extends AbstractController {
    registerRoutes() {
        this.router.get('/', this.auth.groups(['schoolMeetingVoorzitter']), require('./overview'))
        this.router.get('/:id', this.auth.groups(['schoolMeetingVoorzitter']), require('./view'))
        this.router.post('/schedule/:id', this.auth.groups(['schoolMeetingVoorzitter']), require('./schedule'))
        this.router.post('/close/:id', this.auth.groups(['schoolMeetingVoorzitter']), require('./close'))
        this.router.post('/create', this.auth.groups(['jc']), require('./new'))
    }
}

module.exports = LawsuitController
