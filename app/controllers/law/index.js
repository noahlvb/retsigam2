const AbstractController = require('./../AbstractController')

class LawController extends AbstractController{
    registerRoutes () {
        this.router.get('/', require('./overview'))
        this.router.post('/', this.auth(['rechtscoordinator']), require('./new'))
        this.router.post('/:id', this.auth(['rechtscoordinator']), require('./edit'))
        this.router.get('/:id/disable', this.auth(['rechtscoordinator']), require('./disable'))
    }
}

module.exports = LawController
