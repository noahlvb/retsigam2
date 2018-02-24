const AbstractController = require('./../../AbstractController')

class SanctionController extends AbstractController {
    registerRoutes() {
        this.router.get('/overview', this.auth.groups(['jc']), require('./overview'))
        this.router.get('/approve/:id', this.auth.groups(['jc']), require('./approve'))
        this.router.post('/:id', this.auth.groups(['jc']), require('./new'))
    }
}

module.exports = SanctionController
