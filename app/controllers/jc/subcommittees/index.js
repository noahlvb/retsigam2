const AbstractController = require('./../../AbstractController')

class SubcommitteesController extends AbstractController {
    registerRoutes() {
        this.router.get('/:id', this.auth.auth, require('./view'))
        this.router.post('/:id', this.auth.auth, require('./report'))
    }
}

module.exports = SubcommitteesController
