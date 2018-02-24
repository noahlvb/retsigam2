const AbstractController = require('./../AbstractController')

class JCController extends AbstractController {
    registerRoutes() {
        this.router.use('/subcommittees', new (require('./subcommittees')))
        this.router.use('/charges', new (require('./charges')))
        this.router.use('/lawsuit', new (require('./lawsuit')))
        this.router.use('/sanction', new (require('./sanction')))

        this.router.get('/complaint/:id', this.auth.groups(['jc']), require('./complaint'))
        this.router.get('/accepting/:id/:action', this.auth.groups(['jc']), require('./accepting'))
        this.router.get('/report/:id', this.auth.groups(['jc']), require('./report'))
        this.router.get('/sendToJC/:id', this.auth.groups(['jc']), require('./sendToJC'))
        this.router.get('/overview', this.auth.groups(['jc']), require('./overview'))
        this.router.get('/apply', this.auth.auth, require('./applyGET'))
        this.router.post('/apply', this.auth.auth, require('./applyPOST'))
    }
}

module.exports = JCController
