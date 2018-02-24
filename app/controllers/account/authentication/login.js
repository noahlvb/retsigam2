module.exports = function (req, res) {
    res.set({ 'Content-Type' : 'text/html' })
    res.render('login')
}
