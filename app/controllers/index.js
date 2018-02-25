const AbstractController = require('./AbstractController');

class MainController extends AbstractController {
    registerRoutes() {
        this.router.use('/account', new (require('./account')))
        this.router.use('/jc', new (require('./jc')))
        this.router.use('/law', new (require('./law')))
        this.router.use('/schoolmeeting', new (require('./schoolmeeting')))

        this.router.get('/', this.auth(), require('./home'))

        this.router.use(this.errorHandler)
    }

    errorHandler (req, res) {
        res.status(404).render('error/404', { page_url : req.hostname + req.path })
    }
}

module.exports = MainController
