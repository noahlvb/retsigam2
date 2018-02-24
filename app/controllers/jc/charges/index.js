const AbstractController = require('./../../AbstractController')

class ChargesController extends AbstractController {
    registerRoutes() {
        this.router.get('/overview', this.auth.groups(['jc']), require('./overview'))
        this.router.get('/proceeding/:id/:action', this.auth.groups(['jc']), require('./proceeding'))
        this.router.post('/:id', this.auth.groups(['jc']), require('./new'))
    }
}

module.exports = ChargesController
