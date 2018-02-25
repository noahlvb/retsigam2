module.exports = function (groups) {
    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(403).redirect('/account/login')
        }

        for (var index in groups) {
            if (req.user.groups.indexOf(groups[index]) === -1) {
                return res.status(403).send('Not Autherized!')
            }
        }

        next()
    }
}
