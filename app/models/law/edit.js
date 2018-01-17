module.exports = function (content, callback) {
    if (content === '' || content === null || content === undefined) {
        return callback('notAllFields')
    }

    this.content = content
    this.save(function (err) {
        callback(null)
    })
}
