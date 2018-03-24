module.exports = function (req, res, next) {
    if (!(req.user.groups.indexOf('admin') !== -1 || req.user._id == req.params.id)) {
        req.flash('warning', 'Toegang geweigerd')
        return res.redirect('/')
    }

    next()
}
