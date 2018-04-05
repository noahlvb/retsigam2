const AbstractController = require('./../AbstractController')

const upload = require('./../../middlewares/upload')

class LawController extends AbstractController{
    registerRoutes () {
        this.router.get('/', require('./overview'))
        this.router.post('/', this.auth(['rechtscoordinator']), require('./new'))
        this.router.post('/import', this.auth(['rechtscoordinator']), upload.single('csv'), require('./importHHR'))
        this.router.post('/:id', this.auth(['rechtscoordinator']), require('./edit'))
        this.router.get('/:id/disable', this.auth(['rechtscoordinator']), require('./disable'))
    }
}

module.exports = LawController
