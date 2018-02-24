const AbstractController = require('./../AbstractController')

const users = require('./../../models/users')

class AccountController extends AbstractController {
    registerRoutes() {
        this.router.get('/login', require('./authentication/login'))
        this.router.get('/logout', require('./authentication/logout'))
        this.router.post('/login/local', require('./authentication/loginLocal'))

        this.router.get('/manage', this.auth.groups(['admin']), require('./manage/overview'))
        this.router.get('/manage/:id', this.auth.groups(['admin']), require('./manage/individuel'))
        this.router.get('/manage/add', this.auth.groups(['admin']), require('./manage/addGET'))
        this.router.post('/manage/add', this.auth.groups(['admin']), require('./manage/addPOST'))
        this.router.get('/manage/:id/delete', this.auth.groups(['admin']), require('./manage/delete'))
        this.router.post('/manage/:id/group/add', this.auth.groups(['admin']), require('./manage/groupAdd'))
        this.router.get('/manage/:id/group/remove', this.auth.groups(['admin']), require('./manage/groupRemove'))

        this.router.get('/userList', this.auth.groups(['admin']), this.getUserList)
    }

    getUserList (req, res) {
        users.find({}, function (err, document) {
            if (err) {
                return console.error(err)
            }

            res.json(document)
        })
    }
}

module.exports = AccountController
