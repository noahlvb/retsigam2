const AbstractController = require('./../AbstractController')

class SchoolmeetingController extends AbstractController {
    registerRoutes() {
        this.router.get('/', this.auth.auth, require('./overview'))
    }
}

module.exports = SchoolmeetingController
