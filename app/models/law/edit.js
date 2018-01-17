module.exports = function (content, callback) {
    if (content === '' || content === null || content === undefined) {
        callback('notAllFields')
    }

    this.content = content
    this.save(function (err) {
        callback(null)
    })
}
