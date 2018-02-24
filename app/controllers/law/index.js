const AbstractController = require('./../AbstractController')

class LawController extends AbstractController{
    registerRoutes () {
        this.router.get('/', require('./overview'))
        this.router.post('/', this.auth.groups(['rechtscoordinator']), require('./new'))
        this.router.post('/:id', this.auth.groups(['rechtscoordinator']), require('./edit'))
        this.router.get('/:id/disable', this.auth.groups(['rechtscoordinator']), require('./disable'))
    }
}

module.exports = LawController
