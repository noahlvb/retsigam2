const AbstractController = require('./../../AbstractController')

class ChargesController extends AbstractController {
    registerRoutes() {
        this.router.get('/overview', this.auth(['jc']), require('./overview'))
        this.router.get('/proceeding/:id/:action', this.auth(['jc']), require('./proceeding'))
        this.router.post('/:id', this.auth(['jc']), require('./new'))
    }
}

module.exports = ChargesController
